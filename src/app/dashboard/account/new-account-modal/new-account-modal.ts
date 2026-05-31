import { Component, input, output } from '@angular/core';
import { Modal } from '../../../common/modal/modal';

@Component({
  selector: 'new-account-modal',
  imports: [Modal],
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
