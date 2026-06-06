import { Component, input, signal } from '@angular/core';
import { uniqueId } from '../../../helpers/uniqueid';
import { FormField } from '@angular/forms/signals';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input',
  imports: [FormField, NgClass],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input {
  inputFormField = input<any>();
  required = input<boolean>(false);
  label = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');
  id = signal<string>(uniqueId());
}
