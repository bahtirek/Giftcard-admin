import { Component, input, output } from '@angular/core';
import { Modal } from '../../../common/modal/modal';

@Component({
  selector: 'new-giftcard-modal',
  imports: [Modal],
  templateUrl: './new-giftcard-modal.html',
  styleUrl: './new-giftcard-modal.scss',
})
export class NewGiftcardModal {
  isModalOpen = input<boolean>();

  modalCloseEvent = output<void>();

  protected closeModal() {
    this.modalCloseEvent.emit();
  }
}
