import { ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from '../../../../core/services/apiservice.service';
import { QuotationStatusEnum } from '../quotations-from-card/quotations-from-card';
import { QuotationsList } from './quotations-list';

describe('QuotationsList status workflow', () => {
  afterEach(() => vi.restoreAllMocks());

  it('confirms and saves only an allowed quotation status transition', async () => {
    const api = {
      patch: vi.fn().mockReturnValue(of({ isSuccess: true, message: 'Updated' })),
      get: vi.fn().mockReturnValue(of({ data: [] })),
    };
    vi.spyOn(Swal, 'fire')
      .mockResolvedValueOnce({ isConfirmed: true, value: String(QuotationStatusEnum.Sent) } as any)
      .mockResolvedValue({ isConfirmed: true } as any);
    const component = new QuotationsList(
      api as unknown as ApiService,
      { markForCheck: vi.fn() } as unknown as ChangeDetectorRef,
      { instant: (key: string) => key } as unknown as TranslateService,
    );
    const quotation = { id: 17, status: QuotationStatusEnum.Draft };

    await component.changeQuotationStatus(quotation);

    expect(api.patch).toHaveBeenCalledWith('Quotations/ChangeStatus', {
      id: 17,
      status: QuotationStatusEnum.Sent,
    });
    expect(quotation.status).toBe(QuotationStatusEnum.Sent);
    expect(Swal.fire).toHaveBeenNthCalledWith(1, expect.objectContaining({
      input: 'select',
      showCancelButton: true,
    }));
    expect(Swal.fire).toHaveBeenLastCalledWith(expect.objectContaining({
      toast: true,
      icon: 'success',
    }));
  });

  it('does not offer transitions for a terminal status', async () => {
    const api = { patch: vi.fn(), get: vi.fn().mockReturnValue(of({ data: [] })) };
    const fire = vi.spyOn(Swal, 'fire');
    const component = new QuotationsList(
      api as unknown as ApiService,
      { markForCheck: vi.fn() } as unknown as ChangeDetectorRef,
      { instant: (key: string) => key } as unknown as TranslateService,
    );
    const quotation = { id: 18, status: QuotationStatusEnum.Accepted };

    await component.changeQuotationStatus(quotation);

    expect(component.canChangeStatus(quotation)).toBe(false);
    expect(fire).not.toHaveBeenCalled();
    expect(api.patch).not.toHaveBeenCalled();
  });
});
