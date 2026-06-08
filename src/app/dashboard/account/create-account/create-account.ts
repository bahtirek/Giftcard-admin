import { Component, ChangeDetectionStrategy, ViewChild, inject } from '@angular/core';
import { AccountForm } from '../account-form/account-form';
import { Account } from '../account-form/account-form-interface';
import { Location } from '@angular/common';
import { LoaderService } from '../../../common/loader/loader.service';

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

  onSubmitButtonClick() {
    this.childRef?.validateForm();
  }

  async onAccountSubmitEvent(account: Account) {
    console.log('Received Account Data in Parent Component:', account);
    this.loading.show();
    try {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Account created successfully');
    } catch (error) {
      console.error('Error creating account:', error);
    } finally {
      this.loading.hide();
    }
  }

  onCancel() {
    this.location.back();
  }
}
