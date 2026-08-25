import { ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { BookingStatusEnum } from '../../core/enums/booking-status.enum';
import { ApiService } from '../../core/services/apiservice.service';
import { TaskNotificationsService } from '../../core/services/task-notifications.service';
import { AuthService } from '../user/_services/auth.service';
import { BookingsList } from './bookings/bookings-list/bookings-list';
import { ContactMessageDTO, ContactMessagesList } from './contact-messages/contact-messages-list/contact-messages-list';
import { TasksFromCard } from './tasks/tasks-from-card/tasks-from-card';
import { TasksList } from './tasks/tasks-list/tasks-list';
import { TaskStatusEnum } from './tasks/task-status.enum';

describe('status change confirmations', () => {
  const cdr = { markForCheck: vi.fn() } as unknown as ChangeDetectorRef;
  const translate = {
    instant: (key: string, params?: Record<string, string>) =>
      params?.['status'] ? `${key}:${params['status']}` : key,
  } as unknown as TranslateService;
  const auth = {
    getCurrentUserRole: () => 'Agent',
  } as unknown as AuthService;

  afterEach(() => vi.restoreAllMocks());

  it('does not complete a booking until the modal is confirmed', async () => {
    const api = {
      patch: vi.fn().mockReturnValue(of({ isSuccess: true })),
      get: vi.fn().mockReturnValue(of({ data: [] })),
    };
    const component = new BookingsList(api as unknown as ApiService, auth, translate, cdr);
    const modal = vi.spyOn(Swal, 'fire').mockResolvedValue({ isConfirmed: false } as any);

    await component.completeBooking({ id: 10, status: BookingStatusEnum.Confirmed });
    expect(api.patch).not.toHaveBeenCalled();

    modal.mockResolvedValue({ isConfirmed: true } as any);
    await component.completeBooking({ id: 10, status: BookingStatusEnum.Confirmed });
    expect(api.patch).toHaveBeenCalledWith('Bookings/10/ChangeStatus', {
      status: BookingStatusEnum.Completed,
    });
  });

  it('does not start or close a task until the modal is confirmed', async () => {
    const api = {
      patch: vi.fn().mockReturnValue(of({ isSuccess: true })),
      get: vi.fn().mockReturnValue(of({ data: [] })),
    };
    const notifications = { notifyChanged: vi.fn() } as unknown as TaskNotificationsService;
    const component = new TasksList(api as unknown as ApiService, auth, notifications, translate, cdr);
    const modal = vi.spyOn(Swal, 'fire').mockResolvedValue({ isConfirmed: false } as any);

    await component.startTask({ id: 20, status: TaskStatusEnum.Pending });
    expect(api.patch).not.toHaveBeenCalled();

    modal.mockResolvedValue({ isConfirmed: true } as any);
    await component.closeTask({ id: 20, status: TaskStatusEnum.Completed });
    expect(api.patch).toHaveBeenCalledWith('Tasks/20/ChangeStatus', {
      status: TaskStatusEnum.Closed,
    });
  });

  it('does not mark a customer question as read until confirmed', async () => {
    const api = {
      patch: vi.fn().mockReturnValue(of({ isSuccess: true })),
    };
    const component = new ContactMessagesList(api as unknown as ApiService, cdr, translate);
    const message: ContactMessageDTO = {
      id: 30,
      firstName: 'Mona',
      lastName: 'Ali',
      contactNumber: '01000000000',
      email: 'mona@example.com',
      question: 'Can I change my travel dates?',
      submittedAtUtc: '2030-05-10T08:00:00Z',
      isRead: false,
    };
    const modal = vi.spyOn(Swal, 'fire').mockResolvedValue({ isConfirmed: false } as any);

    await component.markAsRead(message);
    expect(api.patch).not.toHaveBeenCalled();
    expect(message.isRead).toBe(false);

    modal.mockResolvedValue({ isConfirmed: true } as any);
    await component.markAsRead(message);
    expect(api.patch).toHaveBeenCalledWith('ContactMessages/30/MarkAsRead', {});
    expect(message.isRead).toBe(true);
  });

  it('does not save an edited task status until confirmed', async () => {
    const api = {
      put: vi.fn().mockReturnValue(of({ isSuccess: true })),
      post: vi.fn().mockReturnValue(of({ isSuccess: true })),
      get: vi.fn().mockReturnValue(of({ data: [] })),
    };
    const component = new TasksFromCard(api as unknown as ApiService, cdr, translate);
    component.selectedTask = {
      id: 40,
      title: 'Call customer',
      agentId: 'agent-1',
      status: TaskStatusEnum.Pending,
      taskType: 1,
      priority: 2,
    };
    component.taskForm.setValue({
      title: 'Call customer',
      description: '',
      agentId: 'agent-1',
      dueDate: '2030-05-10',
      status: TaskStatusEnum.InProgress,
      taskType: 1,
      priority: 2,
    });
    const modal = vi.spyOn(Swal, 'fire').mockResolvedValue({ isConfirmed: false } as any);

    await component.saveTask();
    expect(api.put).not.toHaveBeenCalled();

    modal.mockResolvedValue({ isConfirmed: true } as any);
    await component.saveTask();
    expect(api.put).toHaveBeenCalledTimes(1);
  });
});
