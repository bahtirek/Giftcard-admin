import { Component, input } from '@angular/core';
import { GiftCard } from '../../gift-card.interface';

@Component({
  selector: 'app-gift-card-overview',
  imports: [],
  templateUrl: './gift-card-overview.html',
  styleUrl: './gift-card-overview.scss',
})
export class GiftCardOverview {
  giftCard = input<GiftCard>();
}
