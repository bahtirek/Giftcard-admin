import { Component, input, signal } from '@angular/core';
import { uniqueId } from '../../../helpers/uniqueid';
import { FormField } from '@angular/forms/signals';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-textarea',
  imports: [FormField, NgClass],
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
})
export class Textarea {
  inputFormField = input<any>();
  required = input<boolean>(false);
  label = input<string>('');
  placeholder = input<string>('');
  rows = input<number>(3);
  id = signal<string>(uniqueId());
}
