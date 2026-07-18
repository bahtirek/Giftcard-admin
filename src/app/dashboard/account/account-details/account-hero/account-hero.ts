import { Component, inject, input, linkedSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../account-interface';
import { DatePipe } from '@angular/common';
import { StatusMenu } from "../../../../common/status-menu/status-menu";
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-account-hero',
  imports: [DatePipe, StatusMenu],
  templateUrl: './account-hero.html',
  styleUrl: './account-hero.scss',
})

export class AccountHero {
  router = inject(Router);
  accountService = inject(AccountService)

  account = input<Account>();

  status = linkedSignal(() => this.account()?.status);


  onAddCardButtonClicked() {
    this.router.navigate(['dashboard/create-gift-card']);
  }

  onAccountEditButtonClick() {
    this.router.navigate(['dashboard/edit-account'], {
      state: { account: this.account() }
    });
  }

  onAccountDeleteButtonClick() {

  }

  onStatusSelectedEvent(status: string) {
    this.accountService.patchAccountStatus(status, () => {
      this.status.set(status)
    })
  }
}
