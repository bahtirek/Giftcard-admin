import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'all-accounts',
  imports: [RouterLink],
  templateUrl: './all-accounts.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './all-accounts.scss',
})
export class AllAccounts implements OnInit {
  ngOnInit(): void {
    this.accountService.getAllAccounts();
  }
  private accountService = inject(AccountService);


  accounts = this.accountService.accounts

}
