import { Component, ChangeDetectionStrategy, ViewChild, inject } from '@angular/core';
import { AccountForm } from '../account-form/account-form';
import { Account } from '../account-form/account-form-interface';
import { Location } from '@angular/common';

@Component({
  selector: 'create-account',
  imports: [AccountForm],
  templateUrl: './create-account.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './create-account.scss',
})
export class CreateAccount {
  @ViewChild(AccountForm) childRef!: AccountForm;
  private location = inject(Location);

  onSubmitButtonClick() {
    this.childRef?.validateForm();
  }

  onAccountSubmitEvent(account: Account) {
    console.log('Received Account Data in Parent Component:', account);
    // Here you can handle the submitted account data, e.g., send it to a server or update the UI.
  }

  onCancel() {
    this.location.back();
  }
}
