import { Component, input, output } from '@angular/core';
import { Modal } from '../../../../../common/modal/modal';

@Component({
  selector: 'app-user-delete-modal',
  imports: [Modal],
  templateUrl: './user-delete-modal.html',
  styleUrl: './user-delete-modal.scss',
})
export class UserDeleteModal {
  name = input<string>()
  isModalOpen = input<boolean>();
  onUserDeleteEvent = output<boolean>()

  protected closeModal() {
    this.onUserDeleteEvent.emit(false)
  }

  onDeleteButtonClicked() {
    this.onUserDeleteEvent.emit(true)
  }
}
