import { Component, input, output } from '@angular/core';
import { Modal } from '../../../common/modal/modal';

@Component({
  selector: 'cancel-order-modal',
  imports: [Modal],
  templateUrl: './cancel-order-modal.html',
  styleUrl: './cancel-order-modal.scss',
})
export class CancelOrderModal {
  isModalOpen = input<boolean>();
  modalCloseEvent = output<void>();

  protected closeModal() {
    this.modalCloseEvent.emit();
  }
}
