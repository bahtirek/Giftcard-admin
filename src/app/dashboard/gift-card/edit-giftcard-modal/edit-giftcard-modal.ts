import { Component, input, output } from '@angular/core';
import { Modal } from '../../../common/modal/modal';

@Component({
  selector: 'edit-giftcard-modal',
  imports: [Modal],
  templateUrl: './edit-giftcard-modal.html',
  styleUrl: './edit-giftcard-modal.scss',
})
export class EditGiftcardModal {
  isModalOpen = input<boolean>();

  modalCloseEvent = output<void>();

  protected closeModal() {
    this.modalCloseEvent.emit();
  }
}
