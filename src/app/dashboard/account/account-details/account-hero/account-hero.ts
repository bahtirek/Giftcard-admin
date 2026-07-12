import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../account-interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account-hero',
  imports: [DatePipe],
  templateUrl: './account-hero.html',
  styleUrl: './account-hero.scss',
})
export class AccountHero {
  router = inject(Router);
  account = input<Account>();


  onAddCardButtonClicked() {
    this.router.navigate(['dashboard/create-gift-card']);
  }

  onAccountEditButtonClick() {
    this.router.navigate(['dashboard/edit-account'], {
      state: { account: this.account() }
    });
  }

    onAccountEditClick(account: Account){
  }

  onAccountDeleteButtonClick() {

  }
}
