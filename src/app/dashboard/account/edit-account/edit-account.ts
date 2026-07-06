import { Component, ChangeDetectionStrategy, ViewChild, inject } from '@angular/core';
import { AccountForm } from '../account-form/account-form';
import { AccountService } from '../account.service';
import { AccountModel, Account } from '../account-interface';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'edit-account',
  imports: [AccountForm],
  templateUrl: './edit-account.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './edit-account.scss',
})
export class EditAccount {
  constructor() {
    const router = inject(Router);
    const currentNavigation = router.currentNavigation();
    this.account = currentNavigation?.extras.state?.['account'];
    if(!this.account) router.navigate(['/dashboard/all-accounts'])
  }

  @ViewChild(AccountForm) childRef!: AccountForm;

  private location = inject(Location);
  private accountService = inject(AccountService);
  account: Account;

  onSubmitButtonClick() {
    this.childRef?.validateForm();
  }

  async onAccountSubmitEvent(account: AccountModel) {
    this.accountService.putAccount(account as Account, () => this.onPostComplete())
  }

  onPostComplete ()  {
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }
}
