import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Modal } from '../../../common/modal/modal';

@Component({
  selector: 'edit-giftcard-modal',
  imports: [Modal],
  templateUrl: './edit-giftcard-modal.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './edit-giftcard-modal.scss',
})
export class EditGiftcardModal {
  isModalOpen = input<boolean>();

  modalCloseEvent = output<void>();

  protected closeModal() {
    this.modalCloseEvent.emit();
  }
}
