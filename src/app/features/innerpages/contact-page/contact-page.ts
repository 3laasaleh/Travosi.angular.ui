import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import feather from 'feather-icons';
import { finalize } from 'rxjs';
import { IGenericResponse } from '../../../core/models/genericReponse.model';
import { ApiService } from '../../../core/services/apiservice.service';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';

export interface ContactMessageDTO {
  id: number;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  question: string;
  submittedAtUtc: string;
  isRead: boolean;
  readAtUtc?: string | null;
}

@Component({
  selector: 'app-contact-page',
  imports: [Breadcrumbs, HomeNavbar, FooterOne, ReactiveFormsModule, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-page.html',
})
export class ContactPage implements AfterViewInit {
  bg = 'assets/images/travel-train-station.svg';
  isActive = false;
  isSubmitting = false;
  submitMessage: string | null = null;
  submitMessageKind: 'success' | 'error' | null = null;

  readonly contactForm = new FormGroup({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    contactNumber: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern(/^\+?[0-9\s\-()]{7,30}$/),
      ],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(254)],
    }),
    question: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(2000)],
    }),
  });

  contacts = [
    {
      icon: 'phone',
      name: 'Phone',
      desc: 'The phrasal sequence of the is now so that many campaign and benefit',
      status: '+201155011300',
    },
    {
      icon: 'mail',
      name: 'Email',
      desc: 'The phrasal sequence of the is now so that many campaign and benefit',
      status: 'Info@seaworldholidays.com',
    },
    {
      icon: 'map-pin',
      name: 'Location',
      desc: 'C/54 Northwest Freeway, Suite 558, 7 Mariouteya, Haram, Al Rehab Tower,',
      status: 'View on Google map',
    },
  ];

  constructor(
    private readonly apiService: ApiService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') feather.replace();
  }

  toggle(): void {
    this.isActive = !this.isActive;
  }

  submitQuestion(): void {
    if (this.isSubmitting) return;

    this.submitMessage = null;
    this.submitMessageKind = null;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const form = this.contactForm.getRawValue();
    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim(),
      question: form.question.trim(),
    };

    this.isSubmitting = true;
    this.apiService
      .postUnauthenticated<IGenericResponse<ContactMessageDTO>>('ContactMessages/Submit', payload)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
          this.changeDetectorRef.markForCheck();
        }),
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess) {
            this.showError();
            return;
          }
          this.submitMessageKind = 'success';
          this.submitMessage = 'contactQuestionSent';
          this.contactForm.reset();
        },
        error: () => this.showError(),
      });
  }

  private showError(): void {
    this.submitMessageKind = 'error';
    this.submitMessage = 'contactQuestionSendError';
  }
}
