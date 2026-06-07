import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountForm } from '../account-form/account-form';

@Component({
  selector: 'create-account',
  imports: [AccountForm],
  templateUrl: './create-account.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './create-account.scss',
})
export class CreateAccount {}
