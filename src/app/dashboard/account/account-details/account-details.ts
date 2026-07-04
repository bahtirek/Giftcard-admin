import { Component, inject, input } from '@angular/core';
import { AccountHero } from "./account-hero/account-hero";
import { AccountStats } from "./account-stats/account-stats";
import { InfoCol } from "./info-col/info-col";
import { CardRow } from "./card-row/card-row";
import { OrdersTable } from "./orders-table/orders-table";
import { AccountActivity } from "./account-activity/account-activity";
import { BusinessInfo } from "./business-info/business-info";
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-details',
  imports: [AccountHero, AccountStats, InfoCol, CardRow, OrdersTable, AccountActivity, BusinessInfo],
  templateUrl: './account-details.html',
  styleUrl: './account-details.scss',
})
export class AccountDetails {
  router = inject(Router);
  accountService = inject(AccountService);

  id = input<string>();
  account = this.accountService.currentAccount;

  ngOnInit() {
    this.accountService.setAccountId(this.id());
  }

  onAddCardButtonClicked() {
    this.router.navigate(['dashboard/create-gift-card']);
  }
}
