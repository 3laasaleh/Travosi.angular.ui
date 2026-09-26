import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';
import { vi } from 'vitest';
import { ApiService } from '../../../../core/services/apiservice.service';
import { SaveFeedbackService } from '../../shared/save-feedback.service';
import { HotelsFromCard } from './hotels-from-card';

describe('Hotel save feedback', () => {
  const api = { get: vi.fn(), post: vi.fn(), put: vi.fn() };
  const feedback = { show: vi.fn(), errorMessage: (error: any, fallback: string) => error?.error?.message || error?.message || fallback };

  beforeEach(() => {
    vi.clearAllMocks();
    api.get.mockReturnValue(of({ isSuccess: true, data: [] }));
    TestBed.configureTestingModule({ imports: [HotelsFromCard], providers: [
      provideTranslateService(), { provide: ApiService, useValue: api }, { provide: SaveFeedbackService, useValue: feedback },
    ] });
  });

  function setup(valid = true) {
    const fixture = TestBed.createComponent(HotelsFromCard);
    const component = fixture.componentInstance;
    if (valid) component.hotelForm.patchValue({ nameEng: 'Hotel', nameAr: 'فندق', routeName: 'hotel', destinationId: 1,
      descriptionEng: 'Description', descriptionAr: 'وصف الفندق', isFreeCancelation: true });
    return { fixture, component };
  }

  it('notifies and exposes missing fields without calling the save API', () => {
    const { component } = setup(false);
    component.saveHotel();
    expect(api.post).not.toHaveBeenCalled();
    expect(feedback.show).toHaveBeenCalledWith('warning', 'pleaseCorrectFormErrors');
    expect(component.hotelForm.controls.nameEng.touched).toBe(true);
    expect(component.invalidFieldMessages.some(message => message.includes('nameEnglish'))).toBe(true);
  });

  it('stays busy through facility saving and reports success only after it completes', () => {
    const facilities = new Subject<any>();
    api.post.mockReturnValue(of({ isSuccess: true, data: { id: 8 } }));
    api.put.mockReturnValue(facilities);
    const { component } = setup();
    const saved = vi.fn(); component.hotelSaved.subscribe(saved);
    component.saveHotel();
    expect(component.isLoading).toBe(true);
    expect(saved).not.toHaveBeenCalled();
    facilities.next({ isSuccess: true }); facilities.complete();
    expect(component.isLoading).toBe(false);
    expect(saved).toHaveBeenCalledOnce();
    expect(feedback.show).toHaveBeenCalledWith('success', 'hotelSavedSuccessfully');
  });

  it('reports a facility failure, preserves the form, and retries the created hotel as an update', () => {
    api.post.mockReturnValue(of({ isSuccess: true, data: { id: 8 } }));
    api.put.mockReturnValue(of({ isSuccess: false, message: 'Facilities failed' }));
    const { component } = setup();
    component.saveHotel();
    expect(component.isLoading).toBe(false);
    expect(feedback.show).toHaveBeenCalledWith('error', 'Facilities failed');
    expect(component.hotelForm.controls.nameEng.value).toBe('Hotel');
    api.put.mockImplementation((url: string) => of(url === 'Hotels' ? { isSuccess: true, data: { id: 8 } } : { isSuccess: true }));
    component.saveHotel();
    expect(api.post).toHaveBeenCalledOnce();
    expect(api.put).toHaveBeenCalledWith('Hotels', expect.objectContaining({ id: 8 }));
  });

  it('sends edited existing-image captions with the hotel update without re-uploading the file', () => {
    api.put.mockReturnValue(of({ isSuccess: true, data: { id: 8 } }));
    const { component } = setup();
    component.selectedHotel = { id: 8 } as any;
    component.imageUploads = [{ id: 21, url: 'hotels/8/image.jpg', altEng: ' Updated view ', altAr: ' إطلالة جديدة ', existing: true }];
    component.saveHotel();
    expect(api.put).toHaveBeenCalledWith('Hotels', expect.objectContaining({
      imageUpdates: [{ id: 21, altEng: 'Updated view', altAr: 'إطلالة جديدة' }],
    }));
    expect(api.post).not.toHaveBeenCalled();
  });

  it('validates captions of existing images before writing hotel changes', () => {
    const { component } = setup();
    component.imageUploads = [{ id: 21, url: 'image.jpg', altEng: '  ', altAr: 'صورة', existing: true }];
    component.saveHotel();
    expect(api.put).not.toHaveBeenCalled();
    expect(api.post).not.toHaveBeenCalled();
    expect(component.imageValidationMessage).toBe('imageAltRequired');
  });
});
