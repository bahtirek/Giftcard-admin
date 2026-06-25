import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { uniqueId } from '../../../helpers/uniqueid';
import { FormField } from '@angular/forms/signals';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input',
  imports: [FormField, NgClass],
  templateUrl: './input.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './input.scss',
})
export class AppInput {
  inputFormField = input<any>();
  required = input<boolean>(false);
  label = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');
  id = signal<string>(uniqueId());
  accept = signal<any>('')
}
