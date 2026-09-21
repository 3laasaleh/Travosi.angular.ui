import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import { AirportSearchResult, AirportSearchService } from '../airport-search.service';
import { FlightsFromCard } from './flights-from-card';

describe('FlightsFromCard', () => {
  const cairo: AirportSearchResult = {
    code: 'CAI', icaoCode: 'HECA', name: 'Cairo International Airport', city: 'Cairo',
    country: 'Egypt', countryCode: 'EG', value: 'CAI - Cairo International Airport',
    displayName: 'CAI - Cairo International Airport, Cairo, Egypt',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsFromCard],
      providers: [
        provideTranslateService(),
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: ApiService, useValue: { get: vi.fn().mockReturnValue(of({ data: [{ id: 7, name: 'Example Air', code: ' e5 ' }] })) } },
        { provide: AirportSearchService, useValue: { search: vi.fn().mockReturnValue(of([cairo])) } },
      ],
    }).compileComponents();
  });

  it('switches trip type buttons and keeps segment controls bound while rows change', () => {
    const fixture = TestBed.createComponent(FlightsFromCard);
    fixture.detectChanges();

    const buttons = () => Array.from(fixture.nativeElement.querySelectorAll('button[aria-pressed]')) as HTMLButtonElement[];
    expect(buttons().map((button) => button.getAttribute('aria-pressed'))).toEqual(['true', 'false', 'false']);

    buttons()[2].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.legs.length).toBe(2);
    expect(buttons()[2].getAttribute('aria-pressed')).toBe('true');
    expect(fixture.nativeElement.querySelectorAll('input[formControlName="flightNumber"]').length).toBe(2);

    fixture.componentInstance.addLeg();
    fixture.detectChanges();
    buttons()[1].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.legs.length).toBe(2);

    buttons()[0].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.legs.length).toBe(1);
    expect(fixture.nativeElement.querySelectorAll('input[formControlName="flightNumber"]').length).toBe(1);
  });

  it('keeps a selected flight populated on initial render', () => {
    const fixture = TestBed.createComponent(FlightsFromCard);
    fixture.componentRef.setInput('selectedFlight', {
      id: 42,
      flightType: 'ONE_WAY',
      legs: [{
        originAirport: 'CAI',
        destinationAirport: 'DXB',
        segments: [{ flightNumber: 'SW123', originAirport: 'CAI', destinationAirport: 'DXB' }],
      }],
    });
    fixture.detectChanges();

    expect(fixture.componentInstance.flightForm.controls.id.value).toBe(42);
    expect(fixture.nativeElement.querySelector('input[formControlName="flightNumber"]')?.value).toBe('SW123');
    expect(fixture.nativeElement.querySelector('#leg-origin-0')?.value).toBe(cairo.value);
  });

  it('shows airport names while storing the selected airport code', async () => {
    const fixture = TestBed.createComponent(FlightsFromCard);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('#leg-origin-0') as HTMLInputElement;
    input.value = 'Cairo';
    input.dispatchEvent(new Event('input'));
    await new Promise((resolve) => setTimeout(resolve, 250));
    fixture.detectChanges();

    const option = fixture.nativeElement.querySelector('#leg-origin-0-option-0') as HTMLButtonElement;
    expect(option.textContent).toContain('Cairo International Airport');
    expect(option.textContent).toContain('Cairo, Egypt');
    option.click();
    fixture.detectChanges();

    expect(input.value).toBe(cairo.value);
    expect(fixture.componentInstance.legs.at(0).controls['originAirport'].value).toBe('CAI');
    expect(fixture.componentInstance.segments(0).at(0).controls['originAirport'].value).toBe('CAI');
  });

  it('adjusts passenger counts from one selector without going below each minimum', () => {
    const fixture = TestBed.createComponent(FlightsFromCard);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('button[aria-controls="flight-passengers-menu"]') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();

    const buttons = Array.from(fixture.nativeElement.querySelectorAll('#flight-passengers-menu button')) as HTMLButtonElement[];
    expect(buttons[0].disabled).toBe(true);
    expect(buttons[2].disabled).toBe(true);
    expect(buttons[4].disabled).toBe(true);

    buttons[1].click();
    buttons[3].click();
    buttons[5].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.flightForm.getRawValue()).toMatchObject({ adults: 2, children: 1, infants: 1 });
    expect(fixture.nativeElement.querySelector('#flight-passengers-summary').textContent).toContain('2');

    buttons[0].click();
    buttons[2].click();
    buttons[4].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.flightForm.getRawValue()).toMatchObject({ adults: 1, children: 0, infants: 0 });
    expect(buttons[0].disabled).toBe(true);
    expect(buttons[2].disabled).toBe(true);
    expect(buttons[4].disabled).toBe(true);
  });

  it('shows one journey airport pair and shares a selected stop between segments', async () => {
    const fixture = TestBed.createComponent(FlightsFromCard);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-airport-picker').length).toBe(2);
    (fixture.nativeElement.querySelector('fieldset') as HTMLElement).querySelectorAll('button')[1].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-airport-picker').length).toBe(3);
    expect(fixture.nativeElement.querySelector('#segment-origin-0-0')).toBeNull();
    expect(fixture.nativeElement.querySelector('#segment-destination-0-0')).toBeNull();

    const stopInput = fixture.nativeElement.querySelector('#stop-airport-0-0') as HTMLInputElement;
    stopInput.value = 'Cairo';
    stopInput.dispatchEvent(new Event('input'));
    await new Promise((resolve) => setTimeout(resolve, 250));
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('#stop-airport-0-0-option-0') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(stopInput.value).toBe(cairo.value);
    expect(fixture.componentInstance.segments(0).at(0).controls['destinationAirport'].value).toBe('CAI');
    expect(fixture.componentInstance.segments(0).at(1).controls['originAirport'].value).toBe('CAI');
  });

  it('keeps the selected departure date and time in the segment form value', () => {
    const fixture = TestBed.createComponent(FlightsFromCard);
    fixture.detectChanges();

    const dateInput = fixture.nativeElement.querySelector('#flight-departure-0-0') as HTMLInputElement;
    const timeInput = fixture.nativeElement.querySelector('#flight-departure-0-0-time') as HTMLInputElement;
    const today = fixture.componentInstance.today;
    expect(fixture.debugElement.queryAll(By.directive(DatePicker)).map((picker) => picker.componentInstance.min)).toEqual([today, today]);

    dateInput.value = today;
    dateInput.dispatchEvent(new Event('change'));
    timeInput.value = '09:30';
    timeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const segment = fixture.componentInstance.segments(0).at(0);
    expect(segment.controls['departureLocal'].value).toBe(`${today}T09:30`);
    expect(segment.controls['departureLocal'].hasError('pastDate')).toBe(false);
    segment.controls['departureLocal'].setValue('2000-01-01T09:30');
    segment.controls['arrivalLocal'].setValue('2000-01-01T10:30');
    expect(segment.controls['departureLocal'].hasError('pastDate')).toBe(true);
    expect(segment.controls['arrivalLocal'].hasError('pastDate')).toBe(true);
    expect(fixture.nativeElement.querySelector('#flight-arrival-0-0')).toBeTruthy();
  });

  it('accepts an airline code with digits when an airline is selected', () => {
    const fixture = TestBed.createComponent(FlightsFromCard);
    fixture.detectChanges();
    const select = fixture.nativeElement.querySelector('#flight-airline-0-0') as HTMLSelectElement;
    select.value = Array.from(select.options).find((option) => option.textContent?.includes('Example Air'))!.value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const segment = fixture.componentInstance.segments(0).at(0);
    expect(segment.controls['airlineCode'].value).toBe('E5');
    expect(segment.controls['airlineCode'].valid).toBe(true);
    expect(fixture.nativeElement.textContent).not.toContain('airlineCodeInvalid');
  });

  it('allows arrival on the departure date and rejects an earlier arrival date', () => {
    const fixture = TestBed.createComponent(FlightsFromCard);
    fixture.detectChanges();
    const segment = fixture.componentInstance.segments(0).at(0);

    segment.patchValue({ departureDate: '2099-01-02', arrivalDate: '2099-01-02' });
    expect(segment.hasError('arrivalBeforeDeparture')).toBe(false);

    segment.controls['arrivalDate'].setValue('2099-01-01');
    expect(segment.hasError('arrivalBeforeDeparture')).toBe(true);
  });

  it('shows required-field messages on touch and enables Save only when the flight is valid', () => {
    const fixture = TestBed.createComponent(FlightsFromCard);
    fixture.detectChanges();

    const saveButton = fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;
    const segment = fixture.componentInstance.segments(0).at(0);
    fixture.componentInstance.flightForm.controls.adults.setValue(0);
    fixture.componentInstance.flightForm.controls.adults.markAsTouched();
    fixture.componentInstance.flightForm.controls.price.markAsTouched();
    segment.controls['airlineId'].markAsTouched();
    segment.controls['flightNumber'].markAsTouched();
    segment.controls['ticketNumber'].markAsTouched();
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    expect(saveButton.disabled).toBe(true);
    const messages = fixture.nativeElement.textContent as string;
    expect(messages).toContain('adultsInvalid');
    expect(messages).toContain('flightPriceMinimum');
    expect(messages).toContain('airlineRequired');
    expect(messages).toContain('flightNumberRequired');
    expect(messages).toContain('ticketNumberRequired');

    fixture.componentInstance.flightForm.controls.adults.setValue(1);
    fixture.componentInstance.flightForm.controls.price.setValue(1);
    const leg = fixture.componentInstance.legs.at(0);
    leg.patchValue({ originAirport: 'CAI', destinationAirport: 'DXB' });
    segment.patchValue({
      airlineId: 1,
      airlineCode: 'SW',
      flightNumber: 'SW123',
      ticketNumber: 'PNR123',
      originAirport: 'CAI',
      destinationAirport: 'DXB',
      departureLocal: `${fixture.componentInstance.today}T09:00`,
      arrivalLocal: `${fixture.componentInstance.today}T10:00`,
    });
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    expect(fixture.componentInstance.flightForm.valid).toBe(true);
    expect(saveButton.disabled).toBe(false);

    segment.controls['ticketNumber'].setValue('   ');
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    expect(saveButton.disabled).toBe(true);
  });
});
