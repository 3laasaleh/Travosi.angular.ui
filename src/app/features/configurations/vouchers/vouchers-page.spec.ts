import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../core/services/apiservice.service';
import { Vouchers } from './vouchers-page';

describe('Vouchers', () => {
  it('saves a transfer voucher with its route and normalized times', () => {
    const api = {
      post: vi.fn().mockReturnValue(of({ isSuccess: true })),
      put: vi.fn(),
      get: vi.fn().mockReturnValue(of({ data: [] })),
    };
    const component = new Vouchers(
      api as unknown as ApiService,
      { markForCheck: vi.fn() } as unknown as ChangeDetectorRef,
      { instant: (key: string) => key } as unknown as TranslateService,
    );

    component.form.patchValue({
      customerId: 7,
      serviceType: 5,
      serviceId: null,
      serviceDate: '2030-05-10',
      endDate: '2030-05-10',
      from: '  Cairo Airport  ',
      to: '  Downtown Hotel  ',
      fromTime: '09:30',
      arrivalTime: '10:45',
    });

    component.save();

    expect(api.post).toHaveBeenCalledTimes(1);
    expect(api.post.mock.calls[0][1]).toMatchObject({
      serviceType: 5,
      flightId: null,
      hotelId: null,
      tourId: null,
      packageId: null,
      from: 'Cairo Airport',
      to: 'Downtown Hotel',
      fromTime: '09:30:00',
      arrivalTime: '10:45:00',
    });
  });

  it('rejects invalid transfer schedules', () => {
    const component = new Vouchers(
      { get: vi.fn().mockReturnValue(of({ data: [] })) } as unknown as ApiService,
      { markForCheck: vi.fn() } as unknown as ChangeDetectorRef,
      { instant: (key: string) => key } as unknown as TranslateService,
    );

    component.form.patchValue({ serviceType: 5, serviceDate: '2020-01-01', fromTime: '09:30', arrivalTime: '10:30' });
    expect(component.form.hasError('transferTimeInPast')).toBe(true);

    component.form.patchValue({ serviceDate: '2030-05-10', fromTime: '11:00', arrivalTime: '10:30' });
    expect(component.form.hasError('invalidTransferTimeRange')).toBe(true);

    component.form.patchValue({ fromTime: '11:00', arrivalTime: '11:00' });
    expect(component.form.hasError('invalidTransferTimeRange')).toBe(true);
  });

  it('selects a voucher type and service from the visual catalog', () => {
    const component = new Vouchers(
      { get: vi.fn().mockReturnValue(of({ data: [] })) } as unknown as ApiService,
      { markForCheck: vi.fn() } as unknown as ChangeDetectorRef,
      { instant: (key: string) => key } as unknown as TranslateService,
    );

    component.selectServiceType(3);
    component.selectService({ id: 42, titleEng: 'Nile dinner cruise' });

    expect(component.form.controls.serviceType.value).toBe(3);
    expect(component.isServiceSelected(42)).toBe(true);

    component.selectServiceType(4);
    expect(component.form.controls.serviceId.value).toBeNull();
  });
});
