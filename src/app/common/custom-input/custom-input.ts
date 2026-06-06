import { Component, input, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormField } from '@angular/forms/signals';
import { uniqueId } from '../../helpers/uniqueid';

@Component({
  selector: 'custom-input',
  imports: [NgClass, FormField],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.scss',
})
export class CustomInput {


  inputFormField = input<any>();
  required = input<boolean>(false);
  label = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');
  id = signal<string>(uniqueId());
}
