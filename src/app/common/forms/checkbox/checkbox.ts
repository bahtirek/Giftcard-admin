import { Component, input, output, signal } from '@angular/core';
import { uniqueId } from '../../../helpers/uniqueid';
import { NgClass } from '@angular/common';
import { FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-checkbox',
  imports: [NgClass, FormField],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
})
export class Checkbox {
  inputFormField = input<any>();
  required = input<boolean>(false);
  label = input<string>('');
  type = input<string>('text');
  id = signal<string>(uniqueId());
  accept = signal<any>('')
}
