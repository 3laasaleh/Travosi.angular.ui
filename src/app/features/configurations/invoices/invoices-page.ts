import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { DatePicker } from '../../../shared/components/date-picker/date-picker';

@Component({ selector: 'app-invoices', standalone: true, imports: [CommonModule, ReactiveFormsModule, TranslatePipe, DatePicker], templateUrl: './invoices-page.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class Invoices implements OnInit {
  showForm = false; invoices: any[] = []; customers: any[] = []; tours: any[] = []; packages: any[] = [];
  isLoading = false; errorMessage = ''; selectedId = 0;
  readonly currencies = [{ id: 2, sign: '$', code: 'USD' }, { id: 1, sign: 'EGP', code: 'EGP' }];
  form = new FormGroup({
    customerId: new FormControl<number | null>(null, Validators.required), currencyId: new FormControl(2, Validators.required),
    invoiceDate: new FormControl('', Validators.required), dueDate: new FormControl('', Validators.required),
    discount: new FormControl(0, [Validators.required, Validators.min(0)]), taxRate: new FormControl(0, [Validators.required, Validators.min(0)]),
    notes: new FormControl(''), items: new FormArray<FormGroup>([]),
  });
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void { this.load(); this.loadOptions(); }
  get items(): FormArray<FormGroup> { return this.form.controls.items; }
  get subTotal(): number { return this.items.controls.reduce((s, x) => s + this.lineTotal(x), 0); }
  get tax(): number { return Math.max(0, this.subTotal - Number(this.form.controls.discount.value)) * Number(this.form.controls.taxRate.value) / 100; }
  get total(): number { return Math.max(0, this.subTotal - Number(this.form.controls.discount.value)) + this.tax; }
  toggleForm(): void { this.showForm = !this.showForm; if (!this.showForm) this.reset(); }
  addItem(type = 2, source?: any): void {
    this.items.push(new FormGroup({ itemType: new FormControl(type, Validators.required), serviceId: new FormControl(source?.id ?? null, Validators.required), description: new FormControl(this.name(source), Validators.required), quantity: new FormControl(1, [Validators.required, Validators.min(1)]), unitPrice: new FormControl(Number(source?.pricePerPerson ?? 0), [Validators.required, Validators.min(0)]), discount: new FormControl(0, [Validators.required, Validators.min(0)]) }));
  }
  removeItem(index: number): void { this.items.removeAt(index); }
  serviceOptions(row: FormGroup): any[] { return Number(row.controls['itemType'].value) === 1 ? this.packages : this.tours; }
  serviceChanged(row: FormGroup): void { const source = this.serviceOptions(row).find(x => Number(x.id) === Number(row.controls['serviceId'].value)); row.patchValue({ description: this.name(source), unitPrice: Number(source?.pricePerPerson ?? 0) }); }
  lineTotal(row: FormGroup): number { return Math.max(0, Number(row.controls['quantity'].value) * Number(row.controls['unitPrice'].value) - Number(row.controls['discount'].value)); }
  save(): void {
    if (this.form.invalid || !this.items.length || this.form.controls.dueDate.value! < this.form.controls.invoiceDate.value!) { this.form.markAllAsTouched(); this.errorMessage = 'invalidInvoiceData'; return; }
    const value = this.form.getRawValue(); const payload: any = { ...value, id: this.selectedId, items: value.items.map((x: any, i: number) => ({ itemType: Number(x.itemType), description: x.description, quantity: Number(x.quantity), unitPrice: Number(x.unitPrice), discount: Number(x.discount), sortOrder: i + 1, packageId: Number(x.itemType) === 1 ? Number(x.serviceId) : null, tourId: Number(x.itemType) === 2 ? Number(x.serviceId) : null })) };
    this.isLoading = true; this.api[this.selectedId ? 'put' : 'post']('Invoices', payload).pipe(catchError(e => { this.errorMessage = e?.error?.message ?? 'invoiceSaveError'; return of(null); }), finalize(() => { this.isLoading = false; this.cdr.markForCheck(); })).subscribe(r => { if (r?.isSuccess === false) { this.errorMessage = r.message; return; } if (r) { this.showForm = false; this.reset(); this.load(); } });
  }
  edit(x: any): void { this.reset(); this.selectedId = x.id; this.form.patchValue(x); (x.items ?? []).forEach((i: any) => { this.addItem(i.itemType, { id: i.packageId ?? i.tourId, pricePerPerson: i.unitPrice, nameEng: i.description }); const row = this.items.at(this.items.length - 1); row.patchValue({ quantity: i.quantity, unitPrice: i.unitPrice, discount: i.discount, description: i.description }); }); this.showForm = true; }
  pdf(x: any): void { this.api.getFile(`Invoices/${x.id}/Pdf`).subscribe(blob => this.download(blob, `${x.invoiceNo}.pdf`)); }
  delete(x: any): void { if (!confirm('Delete this invoice?')) return; this.api.delete('Invoices', x.id).subscribe(() => this.load()); }
  private load(): void { this.api.get('Invoices').pipe(catchError(() => of({ data: [] }))).subscribe(r => { this.invoices = this.rows(r); this.cdr.markForCheck(); }); }
  private loadOptions(): void { forkJoin({ customers: this.api.get('Customers?page=1&pageSize=100'), tours: this.api.get('Tours?page=1&pageSize=100'), packages: this.api.get('Packages?page=1&pageSize=100') }).pipe(catchError(() => of({ customers: [], tours: [], packages: [] }))).subscribe((r: any) => { this.customers = this.rows(r.customers); this.tours = this.rows(r.tours); this.packages = this.rows(r.packages); this.cdr.markForCheck(); }); }
  private rows(r: any): any[] { const x = r?.data ?? r; return Array.isArray(x) ? x : (x?.data ?? x?.items ?? []); }
  name(x: any): string { return x?.nameEng ?? x?.titleEng ?? x?.name ?? ''; }
  customerName(x: any): string { return x?.companyName ?? `${x?.firstName ?? ''} ${x?.lastName ?? ''}`.trim(); }
  private reset(): void { this.selectedId = 0; this.items.clear(); this.errorMessage = ''; this.form.reset({ currencyId: 2, discount: 0, taxRate: 0, customerId: null, invoiceDate: '', dueDate: '', notes: '' }); }
  private download(blob: Blob, name: string): void { const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url); }
}
