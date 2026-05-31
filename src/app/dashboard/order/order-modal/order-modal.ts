import { Component, input, output } from '@angular/core';
import { Modal } from '../../../common/modal/modal';

@Component({
  selector: 'order-modal',
  imports: [Modal],
  templateUrl: './order-modal.html',
  styleUrl: './order-modal.scss',
})
export class OrderModal {
  isModalOpen = input<boolean>();

  modalCloseEvent = output<void>();

  protected closeModal() {
    this.modalCloseEvent.emit();
  }
}
