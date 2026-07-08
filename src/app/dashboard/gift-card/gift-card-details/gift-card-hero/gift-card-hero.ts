import { Component, input } from '@angular/core';
import { GiftCard } from '../../gift-card.interface';
import { DatePipe } from '@angular/common';
import { ImageGallery } from "../../../../common/image-gallery/image-gallery";

@Component({
  selector: 'app-gift-card-hero',
  imports: [DatePipe, ImageGallery],
  templateUrl: './gift-card-hero.html',
  styleUrl: './gift-card-hero.scss',
})
export class GiftCardHero {
  giftCard = input<GiftCard>();
}
