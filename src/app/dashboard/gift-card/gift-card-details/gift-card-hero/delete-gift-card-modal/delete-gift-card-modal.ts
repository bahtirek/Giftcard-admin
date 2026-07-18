import { Component, input, output, signal } from '@angular/core';
import { Modal } from '../../../../../common/modal/modal';

@Component({
  selector: 'app-delete-gift-card-modal',
  imports: [Modal],
  templateUrl: './delete-gift-card-modal.html',
  styleUrl: './delete-gift-card-modal.scss',
})
export class DeleteGiftCardModal {
  name = input<string>()
  isModalOpen = input<boolean>();
  onGiftCardDeleteEvent = output<boolean>()

  protected closeModal() {
    this.onGiftCardDeleteEvent.emit(false)
  }

  onDeleteButtonClicked() {
    this.onGiftCardDeleteEvent.emit(true)
  }
}
