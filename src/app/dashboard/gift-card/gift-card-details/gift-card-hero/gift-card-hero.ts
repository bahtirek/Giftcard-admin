import { StatusMenu } from './../../../../common/status-menu/status-menu';
import { Component, input, inject, signal, linkedSignal } from '@angular/core';
import { GiftCard } from '../../gift-card.interface';
import { DatePipe } from '@angular/common';
import { ImageGallery } from "../../../../common/image-gallery/image-gallery";
import { Router } from '@angular/router';
import { DeleteGiftCardModal } from "./delete-gift-card-modal/delete-gift-card-modal";
import { GiftCardService } from '../../gift-card.service';

@Component({
  selector: 'app-gift-card-hero',
  imports: [DatePipe, ImageGallery, StatusMenu, DeleteGiftCardModal],
  templateUrl: './gift-card-hero.html',
  styleUrl: './gift-card-hero.scss',
})

export class GiftCardHero {
  router = inject(Router);
  giftCardService = inject(GiftCardService);

  giftCard = input<GiftCard>();

  isModalOpen = signal<boolean>(false);
  status = linkedSignal(() => this.giftCard()?.status);

  onGiftCardEditButtonClick() {
    this.router.navigate(['dashboard/edit-gift-card', this.giftCard()!.id]);
  }

  onGiftCardDeleteButtonClick() {
    this.isModalOpen.set(true)
  }

  onGiftCardDeleteEvent() {
    this.isModalOpen.set(false)
  }

  onStatusSelectedEvent(status: string) {
    this.giftCardService.patchGiftCardStatus(status, () => {
      this.status.set(status)
    })
  }
}
