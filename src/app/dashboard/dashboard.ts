import { Component, signal } from '@angular/core';
import { Modal } from '../common/modal/modal';
import { NewAccountModal } from './account/new-account-modal/new-account-modal';
import { NewGiftcardModal } from "./gift-card/new-giftcard-modal/new-giftcard-modal";

@Component({
  selector: 'dashboard',
  imports: [NewAccountModal, NewGiftcardModal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  isModalOpen = false;

  openModal(modal: string) {
    console.log(`Opening modal: ${modal}`);

    this.modals.update((prev) => ({ ...prev, [modal]: true }));
    console.log(`Modal states after update:`, this.modals());
  }

  closeModal(modal: string) {
    this.modals.update((prev) => ({ ...prev, [modal]: false }));
  }

  modals = signal({
    isAccountModalOpen: false,
    isGiftcardModalOpen: false,
  });
}
