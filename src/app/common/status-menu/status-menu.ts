import { StatusOptions } from './../../interfaces/status';
import { Component, computed, input, Signal, signal, } from '@angular/core';
import { Dropdown } from '../dropdown/dropdown';
import { DropdownTriggerDirective } from '../dropdown/dropdown-trigger.directive';
import { Option } from '../../interfaces/options';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-status-menu',
  imports: [Dropdown, DropdownTriggerDirective, NgClass],
  templateUrl: './status-menu.html',
  styleUrl: './status-menu.scss',
})
export class StatusMenu {
  ngOnInit(){
    this.selectedStatus.set(this.defaultOption())
  }
  defaultOption = input<string | null>();
  selectedStatus = signal<string | null | undefined>(null);
  statusOptions = signal<Option[]> (StatusOptions);

  badgeClass: Signal<string> = computed(() => {
    if (this.selectedStatus() === "Active") {
      return "badge--success"
    } else if (this.selectedStatus() === "Pending") {
      return "badge--warning"
    } else {
      return ""
    }
  })
}
