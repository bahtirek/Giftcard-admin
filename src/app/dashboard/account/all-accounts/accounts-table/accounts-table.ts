import { Component, input } from '@angular/core';
import { BusinessType } from './business-type/business-type';
import { AccountResponse } from '../../account-form/account-form-interface';

@Component({
  selector: 'app-accounts-table',
  imports: [BusinessType],
  templateUrl: './accounts-table.html',
  styleUrl: './accounts-table.scss',
})
export class AccountsTable {
  accounts = input<AccountResponse[]>()
}
