import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomersFromCard } from './customers-from-card/customers-from-card';
import { CustomersList } from './customers-list/customers-list';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [RouterLink, TranslatePipe, CustomersFromCard, CustomersList],
  templateUrl: './customers-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Customers {
  viewMode: 'table' | 'grid' = 'table';
  showForm = true;
  selectedCustomer: any = null;
  refreshToken = 0;

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.selectedCustomer = null;
  }

  selectCustomerForEdit(customer: any): void {
    this.selectedCustomer = customer;
    this.showForm = true;
  }

  clearSelectedCustomer(): void {
    this.selectedCustomer = null;
  }

  handleCustomerSaved(): void {
    this.selectedCustomer = null;
    this.refreshToken++;
  }
}
