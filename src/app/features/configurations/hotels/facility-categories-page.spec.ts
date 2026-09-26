import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { of, Subject, throwError } from 'rxjs';
import { vi } from 'vitest';
import { ApiService } from '../../../core/services/apiservice.service';
import { SaveFeedbackService } from '../shared/save-feedback.service';
import { FacilityCategoriesPage } from './facility-categories-page';

describe('Facility category feedback', () => {
  const api = { get: vi.fn(), post: vi.fn(), put: vi.fn() };
  const feedback = { show: vi.fn(), errorMessage: (error: any, fallback: string) => error?.error?.message || error?.message || fallback };
  beforeEach(() => {
    vi.clearAllMocks();
    api.get.mockReturnValue(of({ isSuccess: true, data: [] }));
    TestBed.configureTestingModule({ imports: [FacilityCategoriesPage], providers: [
      provideTranslateService(), { provide: ApiService, useValue: api }, { provide: SaveFeedbackService, useValue: feedback },
    ] });
  });
  it('shows the loader until both catalogue requests finish', () => {
    const categories = new Subject<any>();
    api.get.mockImplementation((url: string) => url === 'FacilityCategories' ? categories : of([]));
    const fixture = TestBed.createComponent(FacilityCategoriesPage);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]')).not.toBeNull();
    categories.next({ isSuccess: true, data: [] }); categories.complete(); fixture.detectChanges();
    expect(fixture.componentInstance.loading).toBe(false);
    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeNull();
  });
  it.each([false, true])('notifies about API/business failures and retains the category draft (HTTP error: %s)', httpError => {
    api.post.mockReturnValue(httpError ? throwError(() => ({ error: { message: 'Failed' } })) : of({ isSuccess: false, message: 'Failed' }));
    const component = TestBed.createComponent(FacilityCategoriesPage).componentInstance;
    component.newCategory(); component.categoryForm.patchValue({ nameEng: 'Features', nameAr: 'مرافق' });
    component.saveCategory();
    expect(component.editor).toBe('category');
    expect(component.savingCategory).toBe(false);
    expect(feedback.show).toHaveBeenCalledWith('error', 'Failed');
  });
  it('closes the category editor and notifies after success', () => {
    api.post.mockReturnValue(of({ isSuccess: true, data: { id: 4 } }));
    const component = TestBed.createComponent(FacilityCategoriesPage).componentInstance;
    component.newCategory(); component.categoryForm.patchValue({ nameEng: 'Features', nameAr: 'مرافق' });
    component.setSelctedIcon('mdi-shower');
    expect(component.categoryForm.controls.iconKey.value).toBe('mdi-shower');
    component.saveCategory();
    expect(component.editor).toBeNull();
    expect(feedback.show).toHaveBeenCalledWith('success', 'facilityCategorySaved');
  });
});
