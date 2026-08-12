import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, forkJoin, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { DatePicker } from '../../../shared/components/date-picker/date-picker';

@Component({ selector: 'app-vouchers', standalone: true, imports: [CommonModule, ReactiveFormsModule, TranslatePipe, DatePicker], templateUrl: './vouchers-page.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class Vouchers implements OnInit {
  showForm = false; vouchers: any[] = []; customers: any[] = []; flights: any[] = []; hotels: any[] = []; tours: any[] = []; packages: any[] = []; selectedId = 0; errorMessage = '';
  readonly types = [{ id: 1, key: 'flight' }, { id: 2, key: 'hotel' }, { id: 3, key: 'tour' }, { id: 4, key: 'package' }];
  form = new FormGroup({ customerId: new FormControl<number | null>(null, Validators.required), serviceType: new FormControl(1, Validators.required), serviceId: new FormControl<number | null>(null, Validators.required), serviceDate: new FormControl('', Validators.required), endDate: new FormControl('') });
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void { this.load(); this.loadOptions(); }
  get services(): any[] { return ({ 1: this.flights, 2: this.hotels, 3: this.tours, 4: this.packages } as any)[Number(this.form.controls.serviceType.value)] ?? []; }
  toggleForm(): void { this.showForm = !this.showForm; if (!this.showForm) this.reset(); }
  typeChanged(): void { this.form.controls.serviceId.setValue(null); }
  save(): void {
    if (this.form.invalid || (this.form.controls.endDate.value && this.form.controls.endDate.value < this.form.controls.serviceDate.value!)) { this.form.markAllAsTouched(); this.errorMessage = 'invalidVoucherData'; return; }
    const x: any = this.form.getRawValue(); const type = Number(x.serviceType); const payload: any = { id: this.selectedId, customerId: Number(x.customerId), serviceType: type, serviceDate: x.serviceDate, endDate: x.endDate || null, flightId: type === 1 ? Number(x.serviceId) : null, hotelId: type === 2 ? Number(x.serviceId) : null, tourId: type === 3 ? Number(x.serviceId) : null, packageId: type === 4 ? Number(x.serviceId) : null };
    this.api[this.selectedId ? 'put' : 'post']('Vouchers', payload).pipe(catchError(e => { this.errorMessage = e?.error?.message ?? 'voucherSaveError'; return of(null); })).subscribe(r => { if (r?.isSuccess === false) { this.errorMessage = r.message; return; } if (r) { this.showForm = false; this.reset(); this.load(); } this.cdr.markForCheck(); });
  }
  edit(x: any): void { this.selectedId = x.id; const id = x.flightId ?? x.hotelId ?? x.tourId ?? x.packageId; this.form.setValue({ customerId: x.customerId, serviceType: x.serviceType, serviceId: id, serviceDate: x.serviceDate, endDate: x.endDate ?? '' }); this.showForm = true; }
  pdf(x: any): void { this.api.getFile(`Vouchers/${x.id}/Pdf`).subscribe(blob => this.download(blob, `${x.voucherNo}.pdf`)); }
  delete(x: any): void { if (!confirm('Delete this voucher?')) return; this.api.delete('Vouchers', x.id).subscribe(() => this.load()); }
  name(x: any): string { if (x?.flightNumber) return `${x.flightNumber}: ${x.departureAirport} - ${x.arrivalAirport}`; return x?.nameEng ?? x?.titleEng ?? x?.name ?? ''; }
  customerName(x: any): string { return x?.companyName ?? `${x?.firstName ?? ''} ${x?.lastName ?? ''}`.trim(); }
  private load(): void { this.api.get('Vouchers').pipe(catchError(() => of({ data: [] }))).subscribe(r => { this.vouchers = this.rows(r); this.cdr.markForCheck(); }); }
  private loadOptions(): void { forkJoin({ customers: this.api.get('Customers?page=1&pageSize=100'), flights: this.api.get('Flights?page=1&pageSize=100'), hotels: this.api.get('Hotels?page=1&pageSize=100'), tours: this.api.get('Tours?page=1&pageSize=100'), packages: this.api.get('Packages?page=1&pageSize=100') }).pipe(catchError(() => of({ customers: [], flights: [], hotels: [], tours: [], packages: [] }))).subscribe((r: any) => { this.customers = this.rows(r.customers); this.flights = this.rows(r.flights); this.hotels = this.rows(r.hotels); this.tours = this.rows(r.tours); this.packages = this.rows(r.packages); this.cdr.markForCheck(); }); }
  private rows(r: any): any[] { const x = r?.data ?? r; return Array.isArray(x) ? x : (x?.data ?? x?.items ?? []); }
  private reset(): void { this.selectedId = 0; this.errorMessage = ''; this.form.reset({ customerId: null, serviceType: 1, serviceId: null, serviceDate: '', endDate: '' }); }
  private download(blob: Blob, name: string): void { const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url); }
}
