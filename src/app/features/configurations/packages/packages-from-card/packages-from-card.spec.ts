import { ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../../admin.service';
import { readTourItinerary } from '../../shared/tour-itinerary.model';
import { PackagesFromCard } from './packages-from-card';

describe('PackagesFromCard validation', () => {
  let component: PackagesFromCard;

  beforeEach(() => {
    component = new PackagesFromCard(
      {} as AdminService,
      { markForCheck: vi.fn() } as unknown as ChangeDetectorRef,
      { instant: vi.fn((key: string) => key) } as unknown as TranslateService,
    );
  });

  it('disables the details step until every required input is valid', () => {
    expect(component.currentStepInvalid).toBe(true);

    component.packageForm.patchValue({
      nameEng: 'Cairo Discovery',
      routeName: 'cairo-discovery',
      nameAr: 'اكتشاف القاهرة',
      descriptionEng: 'A complete Cairo travel package.',
      descriptionAr: 'باقة سفر متكاملة إلى القاهرة.',
      durationDays: 3,
      durationHours: 0,
      pricePerPerson: 200,
      pricePerChild: 100,
      maxCapacity: 20,
      dateFrom: '2030-01-01',
      dateTo: '2030-01-05',
      destinationIds: [1],
      isFreeCancelation: true,
    });

    expect(component.detailsStepInvalid).toBe(false);
    expect(component.currentStepInvalid).toBe(false);

    component.packageForm.controls.dateTo.setValue('2029-12-31');
    expect(component.currentStepInvalid).toBe(true);
  });

  it('starts packages tomorrow and keeps the end date at least one day later', () => {
    expect(component.packageForm.controls.dateFrom.value).toBe(component.tomorrow);
    expect(component.packageForm.controls.dateTo.value).toBe(component.dayAfterTomorrow);
    expect(component.minimumPackageEndDate).toBe(component.dayAfterTomorrow);

    component.packageForm.controls.dateFrom.setValue('2030-06-10');

    expect(component.minimumPackageEndDate).toBe('2030-06-11');
  });

  it('keeps ISO package dates visible and valid while editing', () => {
    const travelPackage = {
      id: 7,
      dateFrom: '2026-09-14T00:00:00',
      dateTo: '2026-11-18T00:00:00',
    };
    component.selectedPackage = travelPackage;

    (component as any).populateForm(travelPackage);

    expect(component.minimumPackageStartDate).toBe('2026-09-14');
    expect(component.packageForm.controls.dateFrom.value).toBe('2026-09-14');
    expect(component.packageForm.controls.dateTo.value).toBe('2026-11-18');
    expect(component.packageForm.controls.dateFrom.hasError('minDate')).toBe(false);
  });

  it('validates every localized package content item', () => {
    component.addHighlight();
    component.addInclude();
    component.addExclude();

    for (const collection of [component.highlightsArray, component.includesArray, component.excludesArray]) {
      const item = collection.at(0);
      expect(item.invalid).toBe(true);

      item.patchValue({ valueEng: '   ', valueAr: '\u0642\u064a\u0645\u0629' });
      expect(item.controls['valueEng'].hasError('pattern')).toBe(true);

      item.patchValue({ valueEng: 'Included service', valueAr: '\u0642\u064a\u0645\u0629' });
      expect(item.valid).toBe(true);

      item.controls['valueEng'].setValue('x'.repeat(1001));
      expect(item.controls['valueEng'].hasError('maxlength')).toBe(true);
    }
  });

  it('reads ISO date-time values into visible itinerary time inputs', () => {
    const itinerary = readTourItinerary({
      id: 5,
      arrivalDate: '2030-05-12',
      startTime: '2030-05-12T09:00:00',
      endTime: '2030-05-12T11:30:00',
    });

    expect(itinerary.startTime).toBe('09:00');
    expect(itinerary.endTime).toBe('11:30');
  });

  it('allows an empty itinerary date and orders entered dates chronologically', () => {
    component.packageForm.patchValue({ dateFrom: '2030-01-01', dateTo: '2030-12-31' });
    const previousStep = (component as any).createItineraryGroup({
      titleEng: 'First step',
      titleAr: '\u0627\u0644\u062e\u0637\u0648\u0629 \u0627\u0644\u0623\u0648\u0644\u0649',
      valueEng: 'First step details',
      valueAr: '\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u062e\u0637\u0648\u0629',
      arrivalDate: '2030-03-01',
      startTime: '09:00',
      endTime: '10:00',
    });
    component.itineraryArray.push(previousStep);

    component.openItineraryStepEditor();

    const arrivalDate = component.itineraryDraft!.controls['arrivalDate'];
    expect(arrivalDate.hasError('required')).toBe(false);
    expect(arrivalDate.valid).toBe(true);

    arrivalDate.setValue('2029-12-31');
    expect(component.itineraryDraft!.hasError('itineraryDateBeforePackage')).toBe(true);

    arrivalDate.setValue('2030-02-01');
    expect(component.itineraryDraft!.hasError('itineraryDateBeforePrevious')).toBe(true);

    arrivalDate.setValue('2030-03-01');
    expect(component.itineraryDraft!.hasError('itineraryDateBeforePackage')).toBe(false);
    expect(component.itineraryDraft!.hasError('itineraryDateBeforePrevious')).toBe(false);
  });

  it('disables the images and itinerary steps until their content is valid', () => {
    component.savedPackageId = 10;
    component.activeStep = 2;
    expect(component.currentStepInvalid).toBe(true);

    component.packageForm.controls.images.setValue(['/images/package.webp']);
    expect(component.currentStepInvalid).toBe(false);

    component.activeStep = 3;
    expect(component.currentStepInvalid).toBe(true);
  });

  it('keeps itinerary errors hidden until touch or save and leaves date and notes optional', () => {
    component.validationSubmitted = true;
    component.errorMessage = 'pleaseCorrectFormErrors';

    component.openItineraryStepEditor();

    expect(component.validationSubmitted).toBe(false);
    expect(component.errorMessage).toBe('');
    expect(component.itineraryDraft!.controls['titleEng'].touched).toBe(false);
    expect(component.itineraryDraft!.controls['arrivalDate'].hasError('required')).toBe(false);
    expect(component.itineraryDraft!.controls['notesEng'].hasError('required')).toBe(false);
    expect(component.itineraryDraft!.controls['notesAr'].hasError('required')).toBe(false);

    component.saveItineraryStep();

    expect(component.itineraryDraft!.controls['titleEng'].touched).toBe(true);
    expect(component.itineraryDraft!.controls['valueEng'].touched).toBe(true);
    expect(component.itineraryDraft!.controls['startTime'].touched).toBe(true);
  });

  it('loads and saves itinerary steps in ascending insertion order', () => {
    (component as any).setItinerary([
      { id: 3, orderNumber: 3, titleEng: 'Step 3' },
      { id: 2, orderNumber: 2, titleEng: 'Step 2' },
      { id: 1, orderNumber: 1, titleEng: 'Step 1' },
    ]);

    expect(component.itineraryArray.getRawValue().map((item) => item['titleEng']))
      .toEqual(['Step 1', 'Step 2', 'Step 3']);
    expect((component as any).buildItineraryPayload().map((item: any) => item.OrderNumber))
      .toEqual([1, 2, 3]);
  });

  it('saves an itinerary step without an optional date or notes', () => {
    component.openItineraryStepEditor();
    component.itineraryDraft!.patchValue({
      titleEng: 'Arrival',
      titleAr: '\u0627\u0644\u0648\u0635\u0648\u0644',
      valueEng: 'Meet at the hotel',
      valueAr: '\u0627\u0644\u0644\u0642\u0627\u0621 \u0641\u064a \u0627\u0644\u0641\u0646\u062f\u0642',
      startTime: '09:00',
      endTime: '10:00',
      arrivalDate: '',
      notesEng: '',
      notesAr: '',
    });

    expect(component.itineraryDraft!.valid).toBe(true);
    component.saveItineraryStep();
    expect(component.itineraryDraft).toBeNull();
    expect(component.itineraryArray.length).toBe(1);
  });
});
