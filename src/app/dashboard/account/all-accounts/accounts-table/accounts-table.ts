import { Component, inject, input } from '@angular/core';
import { BusinessType } from './business-type/business-type';
import { AccountResponse } from '../../account-form/account-form-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts-table',
  imports: [BusinessType],
  templateUrl: './accounts-table.html',
  styleUrl: './accounts-table.scss',
})
export class AccountsTable {
  accounts = input<AccountResponse[]>()
  private router = inject(Router)

  onAccountEditClick(account: AccountResponse){
    this.router.navigate(['dashboard/edit-account'], {
      state: { account: account }
    });
  }
}
