import { Component, ChangeDetectionStrategy, ViewChild, inject, effect } from '@angular/core';
import { AccountForm } from '../account-form/account-form';
import { Account, AccountModel } from '../account-interface';
import { Location } from '@angular/common';
import { AccountService } from '../account.service';

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
  private accountService = inject(AccountService)

  onSubmitButtonClick() {
    this.childRef?.validateForm();
  }

  async onAccountSubmitEvent(account: AccountModel) {
    this.accountService.postAccount(account, () => this.onPostComplete())
  }

  onPostComplete ()  {
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }
}
