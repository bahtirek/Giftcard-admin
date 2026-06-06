import { Component, input, output } from '@angular/core';
import { Modal } from '../../../common/modal/modal';
import { AccountForm } from "../account-form/account-form";

@Component({
  selector: 'new-account-modal',
  imports: [Modal, AccountForm],
  templateUrl: './new-account-modal.html',
  styleUrl: './new-account-modal.scss',
})
export class NewAccountModal {
  isModalOpen = input<boolean>();

  modalCloseEvent = output<void>();

  protected closeModal() {
    this.modalCloseEvent.emit();
  }
}
