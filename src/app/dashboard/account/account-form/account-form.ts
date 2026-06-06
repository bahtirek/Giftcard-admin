import { Component, effect, signal } from '@angular/core';
import { Account, accountSchema, initialAccountData } from './account-form-interface';
import { form } from '@angular/forms/signals';
import { AppInput } from "../../../common/forms/input/input";
import { Option } from '../../../interfaces/options';
import { Select } from "../../../common/forms/select/select";
import { Textarea } from "../../../common/forms/textarea/textarea";

@Component({
  selector: 'account-form',
  imports: [AppInput, Select, Textarea],
  templateUrl: './account-form.html',
  styleUrl: './account-form.scss',
})
export class AccountForm {

  accountModel = signal<Account>(initialAccountData);

  accountForm = form(this.accountModel, accountSchema);

  options = signal<Option[]>([
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Service', label: 'Service' },
    { value: 'Grocery', label: 'Grocery' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Other', label: 'Other' }
  ]);

  eff = effect(() => {
    console.log('Account123 Model Updated:', this.accountModel());
  });
}
