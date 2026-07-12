import { Component, input, inject } from '@angular/core';
import { GiftCard } from '../../gift-card.interface';
import { DatePipe } from '@angular/common';
import { ImageGallery } from "../../../../common/image-gallery/image-gallery";
import { Router } from '@angular/router';

@Component({
  selector: 'app-gift-card-hero',
  imports: [DatePipe, ImageGallery],
  templateUrl: './gift-card-hero.html',
  styleUrl: './gift-card-hero.scss',
})
export class GiftCardHero {
  giftCard = input<GiftCard>();
  router = inject(Router)

  onGiftCardEditButtonClick() {
    this.router.navigate(['dashboard/edit-gift-card', this.giftCard()!.id]);
  }

  onGiftCardDeleteButtonClick() {

  }
}
