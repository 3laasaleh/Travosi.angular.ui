import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimePicker } from './time-picker';

describe('TimePicker', () => {
  let fixture: ComponentFixture<TimePicker>;
  let component: TimePicker;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimePicker],
    }).compileComponents();

    fixture = TestBed.createComponent(TimePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
  });

  it.each([
    ['09:30', '09:30'],
    ['09:30:00', '09:30'],
    ['09:30:00.0000000', '09:30'],
  ])('normalizes %s to %s', (apiValue, expected) => {
    component.writeValue(apiValue);
    fixture.detectChanges();

    expect(component.value).toBe(expected);
    expect(input.value).toBe(expected);
  });

  it('emits HH:mm and marks the control touched when the user enters a time', () => {
    const onChange = vi.fn();
    const onTouched = vi.fn();
    component.registerOnChange(onChange);
    component.registerOnTouched(onTouched);

    input.value = '14:45';
    input.dispatchEvent(new Event('input'));

    expect(component.value).toBe('14:45');
    expect(onChange).toHaveBeenCalledWith('14:45');
    expect(onTouched).toHaveBeenCalledTimes(1);
  });

  it('marks the control touched on blur', () => {
    const onTouched = vi.fn();
    component.registerOnTouched(onTouched);

    input.dispatchEvent(new Event('blur'));

    expect(onTouched).toHaveBeenCalledTimes(1);
  });

  it('reflects disabled state and input attributes', () => {
    fixture.componentRef.setInput('id', 'transfer-from-time');
    fixture.componentRef.setInput('placeholder', 'Select time');
    fixture.componentRef.setInput('ariaLabel', 'Transfer departure time');
    fixture.componentRef.setInput('inputClass', 'rounded-2xl');
    component.setDisabledState(true);
    fixture.detectChanges();

    expect(input.id).toBe('transfer-from-time');
    expect(input.placeholder).toBe('Select time');
    expect(input.getAttribute('aria-label')).toBe('Transfer departure time');
    expect(input.classList.contains('rounded-2xl')).toBe(true);
    expect(input.disabled).toBe(true);
  });

  it('uses a unique generated id when one is not supplied', () => {
    const secondFixture = TestBed.createComponent(TimePicker);
    secondFixture.detectChanges();
    const secondInput = secondFixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.id).toMatch(/^flowbite-time-picker-\d+$/);
    expect(secondInput.id).toMatch(/^flowbite-time-picker-\d+$/);
    expect(secondInput.id).not.toBe(input.id);
  });
});
