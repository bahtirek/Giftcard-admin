import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Modal } from '../../../common/modal/modal';

@Component({
  selector: 'order-modal',
  imports: [Modal],
  templateUrl: './order-modal.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './order-modal.scss',
})
export class OrderModal {
  isModalOpen = input<boolean>();

  modalCloseEvent = output<void>();

  protected closeModal() {
    this.modalCloseEvent.emit();
  }
}
