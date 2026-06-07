import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'modal',
  imports: [],
  templateUrl: './modal.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './modal.scss',
})
export class Modal {
  isModalOpen = input<boolean>();

  modalCloseEvent = output<void>();

  protected closeModal() {
    this.modalCloseEvent.emit();
  }
}
