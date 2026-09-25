import { PLATFORM_ID, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../../core/services/apiservice.service';
import { LanguageService } from '../../../../core/services/language.service';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import { HotelRoomsManager } from './hotel-rooms-manager';

describe('HotelRoomsManager pricing periods', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelRoomsManager],
      providers: [
        provideTranslateService(),
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: ApiService, useValue: {} },
        { provide: LanguageService, useValue: { currentLanguage: signal('en') } },
      ],
    }).compileComponents();
  });

  function setup() {
    const fixture = TestBed.createComponent(HotelRoomsManager);
    fixture.componentInstance.addRoom();
    fixture.detectChanges();
    return fixture;
  }

  it('distinguishes empty and nonpositive first-row prices, and accepts a decimal entered in the input', () => {
    const fixture = setup();
    const price = fixture.componentInstance.rates.at(0).controls['price'];
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input[formControlName="price"]');
    const label = input.closest('label')!;
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(label.textContent).toContain('priceRequired');

    input.value = '0';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(label.textContent).toContain('roomPeriodPriceMinimum');
    expect(label.textContent).not.toContain('priceRequired');

    input.value = '125.50';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(price.value).toBe(125.5);
    expect(price.valid).toBe(true);
    expect(label.querySelector('.text-xs.text-red-600')).toBeNull();
  });

  it('rechecks the first end date on form-value changes without a native change event', () => {
    const fixture = setup();
    const period = fixture.componentInstance.rates.at(0);
    period.patchValue({ startDate: '2030-10-01', endDate: '2030-10-03', price: 100 });
    expect(period.valid).toBe(true);

    period.controls['startDate'].setValue('2030-10-04');
    expect(period.controls['endDate'].hasError('dateOrder')).toBe(true);
    period.controls['endDate'].setValue('2030-10-05');
    expect(period.valid).toBe(true);
    period.controls['endDate'].setValue('');
    expect(period.controls['endDate'].hasError('required')).toBe(true);
    expect(period.controls['endDate'].hasError('dateOrder')).toBe(false);
    expect(fixture.debugElement.queryAll(By.directive(DatePicker))
      .every((picker) => !picker.componentInstance.autoSelectToday)).toBe(true);
  });

  it('rechecks later rows when the preceding end date changes', () => {
    const fixture = setup();
    const component = fixture.componentInstance;
    component.rates.at(0).patchValue({ startDate: '2030-10-01', endDate: '2030-10-03', price: 100 });
    component.addPeriod({ endDate: '2030-10-09', price: 150 });
    const secondStart = component.rates.at(1).controls['startDate'];
    expect(secondStart.value).toBe('2030-10-04');
    component.rates.at(0).controls['endDate'].setValue('2030-10-05');
    expect(secondStart.hasError('previousPeriod')).toBe(true);
    component.rates.at(0).controls['endDate'].setValue('2030-10-03');
    expect(secondStart.valid).toBe(true);
  });

  it('keeps the displayed price bound to the current row after removal and reset', () => {
    const fixture = setup();
    const component = fixture.componentInstance;
    component.addPeriod({ startDate: '2030-11-01', endDate: '2030-11-05', price: 200 });
    fixture.detectChanges();
    component.removePeriod(0);
    fixture.detectChanges();
    let input: HTMLInputElement = fixture.nativeElement.querySelector('input[formControlName="price"]');
    expect(input.value).toBe('200');
    component.addRoom();
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input[formControlName="price"]');
    input.value = '75';
    input.dispatchEvent(new Event('input'));
    expect(component.rates.at(0).controls['price'].value).toBe(75);
    expect(component.rates.at(0).controls['price'].valid).toBe(true);
  });
});
