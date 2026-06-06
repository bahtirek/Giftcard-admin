import { Component, effect, signal } from '@angular/core';
import { Account, accountSchema, initialAccountData } from './account-form-interface';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { NgClass } from '@angular/common';
import { CustomInput } from "../../../common/custom-input/custom-input";

@Component({
  selector: 'account-form',
  imports: [FormField, NgClass, CustomInput],
  templateUrl: './account-form.html',
  styleUrl: './account-form.scss',
})
export class AccountForm {

  accountModel = signal<Account>(initialAccountData);

  accountForm = form(this.accountModel, accountSchema)

  eff = effect(() => {
    console.log('Account123 Model Updated:', this.accountModel());
  });
}
