import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { QuotationsFromCard } from './quotations-from-card/quotations-from-card';
import { QuotationsList } from './quotations-list/quotations-list';

@Component({
  selector: 'app-quotations',
  standalone: true,
  imports: [RouterLink, TranslatePipe, QuotationsFromCard, QuotationsList],
  templateUrl: './quotations-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Quotations {
  viewMode: 'table' | 'grid' = 'table';
  showForm = false;
  selectedQuotation: any = null;
  refreshToken = 0;

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.selectedQuotation = null;
  }

  openCreateForm(): void {
    this.selectedQuotation = null;
    this.showForm = true;
  }

  selectQuotationForEdit(quotation: any): void {
    this.selectedQuotation = quotation;
    this.showForm = true;
  }

  clearSelectedQuotation(): void {
    this.selectedQuotation = null;
  }

  handleQuotationSaved(): void {
    this.selectedQuotation = null;
    this.showForm = false;
    this.refreshToken++;
  }
}
