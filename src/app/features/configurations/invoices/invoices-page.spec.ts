import { ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { Invoices } from './invoices-page';

describe('Invoices', () => {
  it('saves flight and transfer invoice items with their references and times', () => {
    const api = {
      post: vi.fn().mockReturnValue(of({ isSuccess: true })),
      put: vi.fn().mockReturnValue(of({ isSuccess: true })),
      get: vi.fn().mockReturnValue(of({ data: [] })),
    };
    const component = new Invoices(
      api as unknown as ApiService,
      { markForCheck: vi.fn() } as unknown as ChangeDetectorRef,
      { instant: (key: string) => key } as unknown as TranslateService,
    );
    const flight = {
      id: 41,
      flightNumber: 'SW 104',
      departureAirport: 'CAI',
      arrivalAirport: 'DXB',
      price: 125,
    };

    component.form.patchValue({ customerId: 7, currencyId: 2 });
    component.addItem(4, flight);
    component.addItem(5);
    component.items.at(1).patchValue({
      from: 'Cairo Airport',
      to: 'Downtown Hotel',
      transferDate: '2030-05-10',
      fromTime: '09:30',
      arrivalTime: '10:45',
      unitPrice: 30,
    });

    component.save();

    expect(api.post).toHaveBeenCalledTimes(1);
    const [, payload] = api.post.mock.calls[0];
    expect(payload.items[0]).toMatchObject({ itemType: 4, flightId: 41, unitPrice: 125 });
    expect(payload.items[1]).toMatchObject({
      itemType: 5,
      description: 'Cairo Airport - Downtown Hotel',
      from: 'Cairo Airport',
      to: 'Downtown Hotel',
      transferDate: '2030-05-10',
      fromTime: '09:30:00',
      arrivalTime: '10:45:00',
    });
  });

  it('rejects a past transfer pickup and an arrival before pickup', () => {
    const component = new Invoices(
      { get: vi.fn().mockReturnValue(of({ data: [] })) } as unknown as ApiService,
      { markForCheck: vi.fn() } as unknown as ChangeDetectorRef,
      { instant: (key: string) => key } as unknown as TranslateService,
    );
    component.addItem(5);
    const row = component.items.at(0);

    row.patchValue({ transferDate: '2020-01-01', fromTime: '09:30', arrivalTime: '10:30' });
    expect(row.hasError('transferTimeInPast')).toBe(true);

    row.patchValue({ transferDate: '2030-05-10', fromTime: '11:00', arrivalTime: '10:30' });
    expect(row.hasError('invalidTransferTimeRange')).toBe(true);
  });
});
