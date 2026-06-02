import { Component, signal } from '@angular/core';
import { NewAccountModal } from './account/new-account-modal/new-account-modal';
import { NewGiftcardModal } from "./gift-card/new-giftcard-modal/new-giftcard-modal";
import { EditAccountModal } from './account/edit-account-modal/edit-account-modal';
import { EditGiftcardModal } from './gift-card/edit-giftcard-modal/edit-giftcard-modal';
import { OrderModal } from './order/order-modal/order-modal';
import { CancelOrderModal } from './order/cancel-order-modal/cancel-order-modal';
import { RouterOutlet } from "@angular/router";
import { Sidebar } from "./common/sidebar/sidebar";

@Component({
  selector: 'dashboard',
  imports: [NewAccountModal, NewGiftcardModal, EditAccountModal, EditGiftcardModal, OrderModal, CancelOrderModal, RouterOutlet, Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  isModalOpen = false;

  openModal(modal: string) {
    this.modals.update((prev) => ({ ...prev, [modal]: true }));
  }

  closeModal(modal: string) {
    this.modals.update((prev) => ({ ...prev, [modal]: false }));
  }

  modals = signal({
    isNewAccountModalOpen: false,
    isGiftcardModalOpen: false,
    isEditAccountModalOpen: false,
    isGiftcardEditModalOpen: false,
    isOrderModalOpen: false,
    isCancelModalOpen: false,
  });
}
