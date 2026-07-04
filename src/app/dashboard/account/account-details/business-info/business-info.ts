import { Component, input } from '@angular/core';
import { Account } from '../../account-interface';

@Component({
  selector: 'app-business-info',
  imports: [],
  templateUrl: './business-info.html',
  styleUrl: './business-info.scss',
})
export class BusinessInfo {
  account = input<Account>();
}
