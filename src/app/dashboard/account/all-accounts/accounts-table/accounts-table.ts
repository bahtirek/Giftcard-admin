import { StatusBadgeDirective } from './../../../../directives/status-badge.directive';
import { Component, inject, input } from '@angular/core';
import { BusinessType } from './business-type/business-type';
import { Account } from '../../account-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts-table',
  imports: [BusinessType, StatusBadgeDirective],
  templateUrl: './accounts-table.html',
  styleUrl: './accounts-table.scss',
})
export class AccountsTable {
  accounts = input<Account[]>()
  private router = inject(Router)

  onAccountViewClick(id: string){
    this.router.navigate(['dashboard/all-accounts/account-details', id])
  }
}
