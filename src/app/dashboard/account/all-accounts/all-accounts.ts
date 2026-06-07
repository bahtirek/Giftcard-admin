import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'all-accounts',
  imports: [RouterLink],
  templateUrl: './all-accounts.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './all-accounts.scss',
})
export class AllAccounts {}
