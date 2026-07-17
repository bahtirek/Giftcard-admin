import { StatusOptions } from './../../interfaces/status';
import { Component, computed, effect, input, output, Signal, signal, inject } from '@angular/core';
import { Dropdown } from '../dropdown/dropdown';
import { DropdownTriggerDirective } from '../dropdown/dropdown-trigger.directive';
import { Option } from '../../interfaces/options';
import { NgClass } from '@angular/common';
import { Modal } from '../modal/modal';
import { AccountService } from '../../dashboard/account/account.service';
import { GiftCardService } from '../../dashboard/gift-card/gift-card.service';

@Component({
  selector: 'app-status-menu',
  imports: [Dropdown, DropdownTriggerDirective, NgClass, Modal],
  templateUrl: './status-menu.html',
  styleUrl: './status-menu.scss',
})
export class StatusMenu {
  ngOnInit(){
    this.currentStatus.set(this.defaultOption())
  }

  accountService = inject(AccountService);
  giftCardService = inject(GiftCardService)

  selectedStatus: string | number | boolean | null | undefined = null;
  defaultOption = input<string | null>();
  statusOptions = signal<Option[]> (StatusOptions);
  currentStatus = signal<string | null | undefined>(null);
  typeToUpdate = input<string>("")
  name = input<string>("")
  onStatusSelectedEvent = output<string>()

  badgeClass: Signal<string> = computed(() => {
    if (this.currentStatus() === "Active") {
      return "badge--success"
    } else if (this.currentStatus() === "Pending") {
      return "badge--warning"
    } else {
      return ""
    }
  })

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
    this.accountService.patchAccountStatus(status, ()=>{
      this.currentStatus.set(status)
    })
    this.closeModal()
  }

  updateGiftCardStatus(status: string){
    this.giftCardService.patchGiftCardStatus(status, ()=>{
      this.currentStatus.set(status)
    })
    this.closeModal()
  }
}
