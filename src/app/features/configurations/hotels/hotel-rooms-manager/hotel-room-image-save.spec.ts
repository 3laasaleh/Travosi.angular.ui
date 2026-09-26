import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';
import { vi } from 'vitest';
import { ApiService } from '../../../../core/services/apiservice.service';
import { LanguageService } from '../../../../core/services/language.service';
import { SaveFeedbackService } from '../../shared/save-feedback.service';
import { HotelRoomsManager } from './hotel-rooms-manager';

describe('Room image saving', () => {
  const api = { get: vi.fn(), put: vi.fn(), post: vi.fn() };
  const feedback = { show: vi.fn(), errorMessage: (error: any, fallback: string) => error?.error?.message || fallback };
  beforeEach(() => {
    vi.clearAllMocks();
    api.get.mockReturnValue(of({ isSuccess: true, data: [] }));
    TestBed.configureTestingModule({ imports: [HotelRoomsManager], providers: [provideTranslateService(),
      { provide: ApiService, useValue: api }, { provide: SaveFeedbackService, useValue: feedback },
      { provide: LanguageService, useValue: { currentLanguage: signal('en') } },
    ] });
  });
  function setup() {
    const component = TestBed.createComponent(HotelRoomsManager).componentInstance;
    component.hotelId = 1; component.addRoom();
    component.roomForm.patchValue({ nameEng: 'Room', nameAr: 'غرفة' });
    component.roomPeriodPrices.at(0).patchValue({ startDate: '2030-10-01', endDate: '2030-10-03', price: 100 });
    return component;
  }

  it('validates image captions before saving and leaves the editor usable', () => {
    const component = setup();
    component.roomImages = [{ id: 1, url: 'image.jpg', altEng: ' ', altAr: 'صورة', existing: true }];
    component.save();
    expect(api.post).not.toHaveBeenCalled();
    expect(component.saving).toBe(false);
    expect(component.imageMessage).toBe('imageAltRequired');
  });

  it('saves existing-image metadata and stops loading when no new uploads are needed', () => {
    const component = setup(); component.editingRoom = { id: 7 };
    component.roomImages = [{ id: 9, url: 'image.jpg', altEng: 'New caption', altAr: 'وصف جديد', existing: true }];
    api.put.mockReturnValue(of({ isSuccess: true, data: { id: 7 } }));
    component.save();
    expect(api.put).toHaveBeenCalledWith('HotelRooms', expect.objectContaining({ imageUpdates: [{ id: 9, altEng: 'New caption', altAr: 'وصف جديد' }] }));
    expect(component.saving).toBe(false);
    expect(component.roomFormOpen()).toBe(false);
    expect(api.post).not.toHaveBeenCalled();
  });

  it('sends multipart images and preserves the draft after upload failure without recreating the room on retry', () => {
    const component = setup();
    const upload = new Subject<any>();
    component.roomImages = [{ file: new File(['image'], 'room.png', { type: 'image/png' }), url: 'blob:room', altEng: 'Room', altAr: 'غرفة', existing: false }];
    api.post.mockImplementation((url: string) => url === 'HotelRooms' ? of({ isSuccess: true, data: { id: 7 } }) : upload);
    api.put.mockReturnValue(of({ isSuccess: true, data: { id: 7 } }));
    component.save();
    expect(component.saving).toBe(true);
    const body = api.post.mock.calls.find(call => call[0] === 'HotelRooms/7/Images')![1] as FormData;
    expect(body.get('Images[0].AltEng')).toBe('Room');
    expect(body.get('Images[0].Image')).toBeInstanceOf(File);
    upload.next({ isSuccess: false, message: 'Upload failed' }); upload.complete();
    expect(component.saving).toBe(false);
    expect(component.roomFormOpen()).toBe(true);
    api.post.mockReturnValue(of({ isSuccess: false, message: 'Upload failed' }));
    component.save();
    expect(api.post.mock.calls.filter(call => call[0] === 'HotelRooms')).toHaveLength(1);
    expect(api.put).toHaveBeenCalledWith('HotelRooms', expect.objectContaining({ id: 7 }));
  });
});
