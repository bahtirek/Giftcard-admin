import { GiftCard } from './../../gift-card/gift-card.interface';
import { Component, input, output, signal } from '@angular/core';
import { uniqueId } from '../../../helpers/uniqueid';
import { Option } from '../../../interfaces/options';
import { form, FormField, required, schema } from '@angular/forms/signals';
import { NgClass } from '@angular/common';
import { Account } from '../../account/account-interface';

@Component({
  selector: 'app-global-search',
  imports: [FormField, NgClass],
  templateUrl: './global-search.html',
  styleUrl: './global-search.scss',
})

export class GlobalSearch {
  inputFormField = input<any>();
  required = input<boolean>(false);
  label = input<string>('Search');
  placeholder = input<string>('');
  type = input<string>('text');
  options = input<Account[]>([]);

  onInputChangeEvent = output<string>()

  id = signal<string>(uniqueId());
  listId = signal<string>(uniqueId());
  isInvalid = signal<boolean>(false);

  onInputChange(event: Event){
    const element = event.target as HTMLInputElement;
    this.onInputChangeEvent.emit(element.value)
  }
}
