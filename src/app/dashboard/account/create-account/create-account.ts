import { Component, ChangeDetectionStrategy, ViewChild, inject } from '@angular/core';
import { AccountForm } from '../account-form/account-form';
import { Account } from '../account-form/account-form-interface';
import { Location } from '@angular/common';
import { LoaderService } from '../../../common/loader/loader.service';
import { AccountService } from '../account-form/account-form.service';

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
  private loading = inject(LoaderService);
  private accountService = inject(AccountService)

  onSubmitButtonClick() {
    this.childRef?.validateForm();
  }

  async onAccountSubmitEvent(account: Account) {
    console.log('Received Account Data in Parent Component:', account);

    this.accountService.postAccount(account).subscribe({
      next: (response) => {
        console.log(response);

      },
    })
  }

  onCancel() {
    this.location.back();
  }
}
