import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Modal } from '../../../common/modal/modal';

@Component({
  selector: 'edit-account-modal',
  imports: [Modal],
  templateUrl: './edit-account-modal.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './edit-account-modal.scss',
})
export class EditAccountModal {
  isModalOpen = input<boolean>();

  modalCloseEvent = output<void>();

  protected closeModal() {
    this.modalCloseEvent.emit();
  }
}
