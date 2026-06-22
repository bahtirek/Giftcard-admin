import { Component } from '@angular/core';
import { AccountHero } from "./account-hero/account-hero";
import { AccountStats } from "./account-stats/account-stats";
import { InfoCol } from "./info-col/info-col";
import { CardRow } from "./card-row/card-row";
import { OrdersTable } from "./orders-table/orders-table";
import { AccountActivity } from "./account-activity/account-activity";
import { BusinessInfo } from "./business-info/business-info";

@Component({
  selector: 'app-account-details',
  imports: [AccountHero, AccountStats, InfoCol, CardRow, OrdersTable, AccountActivity, BusinessInfo],
  templateUrl: './account-details.html',
  styleUrl: './account-details.scss',
})
export class AccountDetails {}
