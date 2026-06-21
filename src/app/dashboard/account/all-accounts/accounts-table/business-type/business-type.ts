import { Component, input } from '@angular/core';

@Component({
  selector: 'app-business-type',
  imports: [],
  templateUrl: './business-type.html',
  styleUrl: './business-type.scss',
})
export class BusinessType {
  businessType = input<string>()
}
