import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { DatePicker } from '../../../shared/components/date-picker/date-picker';

interface CurrencyOption {
  id: number;
  name: string;
  sign: string;
}

interface InvoiceItemForm {
  itemType: FormControl<number>;
  serviceId: FormControl<number | null>;
  description: FormControl<string>;
  quantity: FormControl<number>;
  unitPrice: FormControl<number>;
  discount: FormControl<number>;
}

type InvoiceItemGroup = FormGroup<InvoiceItemForm>;

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe, DatePicker],
  templateUrl: './invoices-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Invoices implements OnInit {
  private readonly fallbackCurrencies: CurrencyOption[] = [
    { id: 2, name: 'USD', sign: '$' },
    { id: 1, name: 'Egyptian Pound', sign: 'EGP' },
  ];

  showForm = false;
  invoices: any[] = [];
  customers: any[] = [];
  tours: any[] = [];
  packages: any[] = [];
  currencies: CurrencyOption[] = [...this.fallbackCurrencies];
  isListLoading = false;
  isOptionsLoading = false;
  optionsLoadError = false;
  isSaving = false;
  errorMessage = '';
  selectedId = 0;
  deletingId: number | null = null;
  downloadingId: number | null = null;

  readonly form = new FormGroup({
    customerId: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    currencyId: new FormControl(2, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    invoiceDate: new FormControl(this.localDate(new Date()), { nonNullable: true, validators: [Validators.required] }),
    dueDate: new FormControl(this.localDate(new Date()), { nonNullable: true, validators: [Validators.required] }),
    discount: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    taxRate: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0), Validators.max(100)] }),
    notes: new FormControl('', { nonNullable: true }),
    items: new FormArray<InvoiceItemGroup>([]),
  }, { validators: Invoices.invoiceDatesValidator });

  constructor(
    private readonly api: ApiService,
    private readonly cdr: ChangeDetectorRef,
    private readonly translate: TranslateService,
  ) {
    this.form.controls.invoiceDate.valueChanges.subscribe((invoiceDate) => {
      const dueDate = this.form.controls.dueDate.value;
      if (invoiceDate && (!dueDate || dueDate < invoiceDate)) {
        this.form.controls.dueDate.setValue(invoiceDate);
      }
    });
  }

  ngOnInit(): void {
    this.load();
    this.loadOptions();
  }

  get items(): FormArray<InvoiceItemGroup> {
    return this.form.controls.items;
  }

  get subTotal(): number {
    return this.roundMoney(this.items.controls.reduce((sum, row) => sum + this.lineTotal(row), 0));
  }

  get tax(): number {
    const taxable = Math.max(0, this.subTotal - this.numberValue(this.form.controls.discount.value));
    return this.roundMoney(taxable * this.numberValue(this.form.controls.taxRate.value) / 100);
  }

  get total(): number {
    return this.roundMoney(Math.max(0, this.subTotal - this.numberValue(this.form.controls.discount.value)) + this.tax);
  }

  get invoiceDiscountInvalid(): boolean {
    return this.numberValue(this.form.controls.discount.value) > this.subTotal;
  }

  get selectedCurrencySign(): string {
    return this.currencies.find((currency) => currency.id === Number(this.form.controls.currencyId.value))?.sign ?? '';
  }

  toggleForm(): void {
    if (this.isSaving) return;
    this.showForm = !this.showForm;
    if (!this.showForm) this.reset();
  }

  addItem(type = 2, source?: any): void {
    this.items.push(this.createItemGroup(type, source));
    this.errorMessage = '';
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
    this.errorMessage = '';
  }

  serviceOptions(row: InvoiceItemGroup): any[] {
    return Number(row.controls.itemType.value) === 1 ? this.packages : this.tours;
  }

  itemTypeChanged(row: InvoiceItemGroup): void {
    row.patchValue({ serviceId: null, description: '', unitPrice: 0, discount: 0 });
    row.controls.serviceId.markAsUntouched();
    this.errorMessage = '';
  }

  serviceChanged(row: InvoiceItemGroup): void {
    const source = this.serviceOptions(row)
      .find((option) => Number(option.id) === Number(row.controls.serviceId.value));
    row.patchValue({
      description: this.name(source),
      unitPrice: this.numberValue(source?.pricePerPerson ?? source?.price),
      discount: 0,
    });
  }

  lineBase(row: InvoiceItemGroup): number {
    return this.roundMoney(
      this.numberValue(row.controls.quantity.value) * this.numberValue(row.controls.unitPrice.value),
    );
  }

  lineTotal(row: InvoiceItemGroup): number {
    return this.roundMoney(Math.max(0, this.lineBase(row) - this.numberValue(row.controls.discount.value)));
  }

  lineDiscountInvalid(row: InvoiceItemGroup): boolean {
    return this.numberValue(row.controls.discount.value) > this.lineBase(row);
  }

  save(): void {
    if (this.isSaving) return;
    if (this.form.hasError('invalidInvoiceDates')) {
      this.form.markAllAsTouched();
      this.errorMessage = 'invoiceDueDateInvalid';
      return;
    }
    if (this.invoiceDiscountInvalid) {
      this.form.controls.discount.markAsTouched();
      this.errorMessage = 'discountExceedsSubtotal';
      return;
    }
    if (this.items.controls.some((row) => this.lineDiscountInvalid(row))) {
      this.items.markAllAsTouched();
      this.errorMessage = 'lineDiscountExceedsTotal';
      return;
    }
    if (this.form.controls.taxRate.invalid) {
      this.form.controls.taxRate.markAsTouched();
      this.errorMessage = 'taxRateInvalid';
      return;
    }
    if (this.form.invalid || !this.items.length) {
      this.form.markAllAsTouched();
      this.errorMessage = 'invalidInvoiceData';
      return;
    }

    const value = this.form.getRawValue();
    const payload = {
      id: this.selectedId,
      customerId: Number(value.customerId),
      currencyId: Number(value.currencyId),
      invoiceDate: value.invoiceDate,
      dueDate: value.dueDate,
      discount: this.numberValue(value.discount),
      taxRate: this.numberValue(value.taxRate),
      notes: value.notes.trim() || null,
      items: value.items.map((item, index) => ({
        itemType: Number(item.itemType),
        description: item.description.trim(),
        quantity: Number(item.quantity),
        unitPrice: this.numberValue(item.unitPrice),
        discount: this.numberValue(item.discount),
        sortOrder: index + 1,
        packageId: Number(item.itemType) === 1 ? Number(item.serviceId) : null,
        tourId: Number(item.itemType) === 2 ? Number(item.serviceId) : null,
      })),
    };

    this.isSaving = true;
    this.errorMessage = '';
    const request$ = this.selectedId
      ? this.api.put('Invoices', payload)
      : this.api.post('Invoices', payload);

    request$.pipe(
      catchError((error) => {
        this.errorMessage = this.apiError(error, 'invoiceSaveError');
        return of(null);
      }),
      finalize(() => {
        this.isSaving = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.errorMessage = this.responseError(response, 'invoiceSaveError');
        return;
      }
      this.showForm = false;
      this.reset();
      this.load();
    });
  }

  edit(invoice: any): void {
    this.reset();
    this.selectedId = Number(invoice.id);
    this.ensureCurrencyIsAvailable(invoice);
    this.form.patchValue({
      customerId: Number(invoice.customerId),
      currencyId: Number(invoice.currencyId),
      invoiceDate: this.dateOnly(invoice.invoiceDate),
      dueDate: this.dateOnly(invoice.dueDate),
      discount: this.numberValue(invoice.discount),
      taxRate: this.numberValue(invoice.taxRate),
      notes: invoice.notes ?? '',
    });

    (invoice.items ?? []).forEach((item: any) => {
      const itemType = Number(item.itemType);
      const serviceId = Number(itemType === 1 ? item.packageId : item.tourId);
      this.ensureCatalogItemIsAvailable(itemType, serviceId, item.description, item.unitPrice);
      const source = this.serviceOptionsForType(itemType)
        .find((option) => Number(option.id) === serviceId);
      const row = this.createItemGroup(itemType, source);
      row.patchValue({
        serviceId,
        description: item.description ?? this.name(source),
        quantity: this.numberValue(item.quantity, 1),
        unitPrice: this.numberValue(item.unitPrice),
        discount: this.numberValue(item.discount),
      });
      this.items.push(row);
    });
    this.showForm = true;
  }

  pdf(invoice: any): void {
    if (this.downloadingId !== null) return;
    this.downloadingId = Number(invoice.id);
    this.errorMessage = '';
    this.api.getFile(`Invoices/${invoice.id}/Pdf`).pipe(
      catchError(() => {
        this.errorMessage = 'pdfDownloadError';
        return of(null);
      }),
      finalize(() => {
        this.downloadingId = null;
        this.cdr.markForCheck();
      }),
    ).subscribe((blob) => {
      if (blob) this.download(blob, `${invoice.invoiceNo || `invoice-${invoice.id}`}.pdf`);
    });
  }

  delete(invoice: any): void {
    if (this.deletingId !== null) return;
    const confirmed = confirm(
      `${this.translate.instant('confirmDeleteRecord')} ${this.translate.instant('recordDeleteWarning')}`,
    );
    if (!confirmed) return;

    this.deletingId = Number(invoice.id);
    this.errorMessage = '';
    this.api.delete('Invoices', invoice.id).pipe(
      catchError((error) => {
        this.errorMessage = this.apiError(error, 'recordDeleteError');
        return of(null);
      }),
      finalize(() => {
        this.deletingId = null;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.errorMessage = this.responseError(response, 'recordDeleteError');
        return;
      }
      this.load();
    });
  }

  loadOptions(): void {
    if (this.isOptionsLoading) return;
    this.isOptionsLoading = true;
    this.optionsLoadError = false;

    const safeGet = (url: string) => this.api.get(url).pipe(catchError(() => {
      this.optionsLoadError = true;
      return of(null);
    }));

    forkJoin({
      customers: safeGet('Customers?page=1&pageSize=100'),
      tours: safeGet('Tours?page=1&pageSize=100'),
      packages: safeGet('Packages?page=1&pageSize=100'),
      currencies: safeGet('Currencies'),
    }).pipe(finalize(() => {
      this.isOptionsLoading = false;
      this.cdr.markForCheck();
    })).subscribe((response) => {
      this.customers = this.optionRows(response.customers);
      this.tours = this.optionRows(response.tours);
      this.packages = this.optionRows(response.packages);
      const currencies = this.optionRows(response.currencies)
        .map((currency) => ({
          id: Number(currency.id),
          name: String(currency.name ?? currency.code ?? currency.sign ?? ''),
          sign: String(currency.sign ?? currency.code ?? ''),
        }))
        .filter((currency) => currency.id > 0 && currency.name);
      this.currencies = currencies.length ? currencies : [...this.fallbackCurrencies];
    });
  }

  name(item: any): string {
    return item?.nameEng ?? item?.titleEng ?? item?.nameAr ?? item?.titleAr ?? item?.name ?? '';
  }

  customerName(customer: any): string {
    return customer?.companyName ?? `${customer?.firstName ?? ''} ${customer?.lastName ?? ''}`.trim();
  }

  currencyLabel(currency: CurrencyOption): string {
    return currency.sign && currency.sign !== currency.name
      ? `${currency.name} (${currency.sign})`
      : currency.name;
  }

  private load(): void {
    this.isListLoading = true;
    this.api.get('Invoices').pipe(
      catchError((error) => {
        this.errorMessage = this.apiError(error, 'invoiceListLoadError');
        return of(null);
      }),
      finalize(() => {
        this.isListLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.errorMessage = this.responseError(response, 'invoiceListLoadError');
        this.invoices = [];
        return;
      }
      this.invoices = this.rows(response);
    });
  }

  private createItemGroup(type: number, source?: any): InvoiceItemGroup {
    return new FormGroup<InvoiceItemForm>({
      itemType: new FormControl(type, { nonNullable: true, validators: [Validators.required] }),
      serviceId: new FormControl<number | null>(source?.id ?? null, [Validators.required, Validators.min(1)]),
      description: new FormControl(this.name(source), {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/\S/)],
      }),
      quantity: new FormControl(1, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1), Invoices.integerValidator],
      }),
      unitPrice: new FormControl(this.numberValue(source?.pricePerPerson ?? source?.price), {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
      discount: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
    });
  }

  private serviceOptionsForType(type: number): any[] {
    return type === 1 ? this.packages : this.tours;
  }

  private ensureCatalogItemIsAvailable(type: number, id: number, description: string, price: unknown): void {
    if (!id) return;
    const target = this.serviceOptionsForType(type);
    if (target.some((option) => Number(option.id) === id)) return;
    target.push(type === 1
      ? { id, nameEng: description, pricePerPerson: price }
      : { id, titleEng: description, pricePerPerson: price });
  }

  private ensureCurrencyIsAvailable(invoice: any): void {
    const id = Number(invoice.currencyId);
    if (!id || this.currencies.some((currency) => currency.id === id)) return;
    const sign = String(invoice.currencySign ?? '');
    this.currencies.push({ id, name: sign || `#${id}`, sign });
  }

  private optionRows(response: any): any[] {
    if (!response || response?.isSuccess === false) {
      this.optionsLoadError = true;
      return [];
    }
    return this.rows(response);
  }

  private rows(response: any): any[] {
    const payload = response?.data ?? response;
    const rows = Array.isArray(payload) ? payload : payload?.data ?? payload?.items ?? [];
    return Array.isArray(rows) ? rows : [];
  }

  private reset(): void {
    const today = this.localDate(new Date());
    this.selectedId = 0;
    this.items.clear();
    this.errorMessage = '';
    this.form.reset({
      currencyId: this.currencies.some((currency) => currency.id === 2) ? 2 : (this.currencies[0]?.id ?? 2),
      discount: 0,
      taxRate: 0,
      customerId: null,
      invoiceDate: today,
      dueDate: today,
      notes: '',
    });
  }

  private numberValue(value: unknown, fallback = 0): number {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  private roundMoney(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

  private localDate(value: Date): string {
    return [
      value.getFullYear().toString().padStart(4, '0'),
      (value.getMonth() + 1).toString().padStart(2, '0'),
      value.getDate().toString().padStart(2, '0'),
    ].join('-');
  }

  private dateOnly(value: unknown): string {
    return typeof value === 'string' ? value.slice(0, 10) : '';
  }

  private responseError(response: any, fallback: string): string {
    const errors = Array.isArray(response?.errors)
      ? response.errors.filter((error: unknown) => typeof error === 'string' && error.trim())
      : [];
    return errors.length ? errors.join(' ') : response?.message || fallback;
  }

  private apiError(error: any, fallback: string): string {
    return this.responseError(error?.error, fallback);
  }

  private download(blob: Blob, name: string): void {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = name;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  private static invoiceDatesValidator(control: AbstractControl): ValidationErrors | null {
    const invoiceDate = String(control.get('invoiceDate')?.value ?? '');
    const dueDate = String(control.get('dueDate')?.value ?? '');
    return invoiceDate && dueDate && dueDate < invoiceDate ? { invalidInvoiceDates: true } : null;
  }

  private static integerValidator(control: AbstractControl): ValidationErrors | null {
    const value = Number(control.value);
    return Number.isInteger(value) ? null : { integer: true };
  }
}
