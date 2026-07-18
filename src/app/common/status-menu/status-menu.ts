import { StatusOptions } from './../../interfaces/status';
import { Component, input, output, signal } from '@angular/core';
import { Dropdown } from '../dropdown/dropdown';
import { DropdownTriggerDirective } from '../dropdown/dropdown-trigger.directive';
import { Option } from '../../interfaces/options';
import { Modal } from '../modal/modal';
import { StatusBadgeDirective } from '../../directives/status-badge.directive';

@Component({
  selector: 'app-status-menu',
  imports: [Dropdown, DropdownTriggerDirective, Modal, StatusBadgeDirective],
  templateUrl: './status-menu.html',
  styleUrl: './status-menu.scss',
})

export class StatusMenu {
  defaultOption = input<string | null>();
  typeToUpdate = input<string>("")
  name = input<string>("")

  onStatusSelectedEvent = output<string>()

  statusOptions = signal<Option[]> (StatusOptions);
  selectedStatus: string | number | boolean | null | undefined = null;


  onStatusValueChanged(event: string | number | boolean | null | undefined){
    this.isModalOpen.set(true);
    this.selectedStatus = event
  }

  openModal(){
    this.isModalOpen.set(true)
  }

  isModalOpen = signal<boolean>(false);

  protected closeModal() {
    this.isModalOpen.set(false)
  }

  onUpdateButtonClicked(){
    if(!this.selectedStatus) {
      this.closeModal()
      return
    }
    this.onStatusSelectedEvent.emit(this.selectedStatus as string)
    if(this.typeToUpdate() === 'account') {
      this.updateAccountStatus(this.selectedStatus as string)
    } else if (this.typeToUpdate() === 'gift card') {
      this.updateGiftCardStatus(this.selectedStatus as string)
    }
  }

  updateAccountStatus(status: string){
    this.onStatusSelectedEvent.emit(status)
    this.closeModal()
  }

  updateGiftCardStatus(status: string){
    this.onStatusSelectedEvent.emit(status)
    this.closeModal()
  }
}
