import { Component, inject, input } from '@angular/core';
import { BusinessType } from './business-type/business-type';
import { Account } from '../../account-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts-table',
  imports: [BusinessType],
  templateUrl: './accounts-table.html',
  styleUrl: './accounts-table.scss',
})
export class AccountsTable {
  accounts = input<Account[]>()
  private router = inject(Router)

  onAccountEditClick(account: Account){
    this.router.navigate(['dashboard/edit-account'], {
      state: { account: account }
    });
  }
}
