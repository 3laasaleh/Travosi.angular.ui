import { ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { TasksFromCard } from './tasks-from-card';

describe('TasksFromCard', () => {
  const api = { get: vi.fn().mockReturnValue(of({ data: [] })) } as unknown as ApiService;
  const cdr = { markForCheck: vi.fn() } as unknown as ChangeDetectorRef;
  const translate = { instant: (key: string) => key } as unknown as TranslateService;

  it('rejects due dates before today and accepts today or later', () => {
    const component = new TasksFromCard(api, cdr, translate);
    const dueDate = component.taskForm.controls.dueDate;
    const today = new Date(`${component.today}T00:00:00`);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayValue = [
      yesterday.getFullYear().toString().padStart(4, '0'),
      (yesterday.getMonth() + 1).toString().padStart(2, '0'),
      yesterday.getDate().toString().padStart(2, '0'),
    ].join('-');

    dueDate.setValue(yesterdayValue);
    expect(dueDate.hasError('pastDate')).toBe(true);

    dueDate.setValue(component.today);
    expect(dueDate.valid).toBe(true);

    dueDate.setValue('2099-12-31');
    expect(dueDate.valid).toBe(true);
  });
});
