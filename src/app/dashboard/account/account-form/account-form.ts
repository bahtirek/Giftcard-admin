import { Component, effect, signal, ChangeDetectionStrategy, output, input, OnInit } from '@angular/core';
import { Account, AccountResponse, accountSchema, initialAccountData } from './account-form-interface';
import { form } from '@angular/forms/signals';
import { AppInput } from '../../../common/forms/input/input';
import { Option } from '../../../interfaces/options';
import { Select } from '../../../common/forms/select/select';
import { Textarea } from '../../../common/forms/textarea/textarea';

@Component({
  selector: 'account-form',
  imports: [AppInput, Select, Textarea],
  templateUrl: './account-form.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './account-form.scss',
})
export class AccountForm implements OnInit{
  ngOnInit(): void {
    if(this.account()?.id) {
      const editingAccount: Account = this.account() as Account;
      this.accountModel.set(editingAccount)
    }
  }

  account = input<AccountResponse>()

  accountModel = signal<Account>(initialAccountData);

  accountForm = form(this.accountModel, accountSchema);

  options = signal<Option[]>([
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Service', label: 'Service' },
    { value: 'Grocery', label: 'Grocery' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Other', label: 'Other' },
  ]);

  validateForm() {
    this.accountForm().markAsTouched();
    if (this.accountForm().valid()) {
      this.submitAccount.emit(this.accountModel());
    }
  }

  submitAccount = output<Account>();
}
