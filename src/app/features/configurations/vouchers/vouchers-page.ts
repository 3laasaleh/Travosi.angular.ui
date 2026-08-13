import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';

@Component({ selector: 'app-vouchers', standalone: true, imports: [CommonModule, ReactiveFormsModule, TranslatePipe], templateUrl: './vouchers-page.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class Vouchers implements OnInit {
  showForm = false; vouchers: any[] = []; customers: any[] = []; selectedId = 0; errorMessage = '';
  readonly types = [{ id: 1, key: 'flight' }, { id: 2, key: 'hotel' }, { id: 3, key: 'tour' }, { id: 4, key: 'package' }];
  form = new FormGroup({ customerId: new FormControl<number | null>(null, Validators.required), serviceType: new FormControl(1, Validators.required) });
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void { this.load(); this.loadOptions(); }
  toggleForm(): void { this.showForm = !this.showForm; if (!this.showForm) this.reset(); }
  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); this.errorMessage = 'invalidVoucherData'; return; }
    const x = this.form.getRawValue(); const payload = { id: this.selectedId, customerId: Number(x.customerId), serviceType: Number(x.serviceType) };
    this.api[this.selectedId ? 'put' : 'post']('Vouchers', payload).pipe(catchError(e => { this.errorMessage = e?.error?.message ?? 'voucherSaveError'; return of(null); })).subscribe(r => { if (r?.isSuccess === false) { this.errorMessage = r.message; return; } if (r) { this.showForm = false; this.reset(); this.load(); } this.cdr.markForCheck(); });
  }
  edit(x: any): void { this.selectedId = x.id; this.form.setValue({ customerId: x.customerId, serviceType: x.serviceType }); this.showForm = true; }
  pdf(x: any): void { this.api.getFile(`Vouchers/${x.id}/Pdf`).subscribe(blob => this.download(blob, `${x.voucherNo}.pdf`)); }
  delete(x: any): void { if (!confirm('Delete this voucher?')) return; this.api.delete('Vouchers', x.id).subscribe(() => this.load()); }
  customerName(x: any): string { return x?.companyName ?? `${x?.firstName ?? ''} ${x?.lastName ?? ''}`.trim(); }
  private load(): void { this.api.get('Vouchers').pipe(catchError(() => of({ data: [] }))).subscribe(r => { this.vouchers = this.rows(r); this.cdr.markForCheck(); }); }
  private loadOptions(): void { this.api.get('Customers?page=1&pageSize=100').pipe(catchError(() => of([]))).subscribe(r => { this.customers = this.rows(r); this.cdr.markForCheck(); }); }
  private rows(r: any): any[] { const x = r?.data ?? r; return Array.isArray(x) ? x : (x?.data ?? x?.items ?? []); }
  private reset(): void { this.selectedId = 0; this.errorMessage = ''; this.form.reset({ customerId: null, serviceType: 1 }); }
  private download(blob: Blob, name: string): void { const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url); }
}
