import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { uniqueId } from '../../../helpers/uniqueid';
import { FormField } from '@angular/forms/signals';
import { NgClass } from '@angular/common';
import { Option } from '../../../interfaces/options';

@Component({
  selector: 'app-select',
  imports: [FormField, NgClass],
  templateUrl: './select.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './select.scss',
})
export class Select {
  inputFormField = input<any>();
  required = input<boolean>(false);
  label = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');
  id = signal<string>(uniqueId());
  options = input<Option[]>([]);

  isInvalid = signal<boolean>(false);
}
