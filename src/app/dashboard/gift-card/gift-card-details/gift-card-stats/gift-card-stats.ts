import { Component, input } from '@angular/core';
import { GiftCard } from '../../gift-card.interface';

@Component({
  selector: 'app-gift-card-stats',
  imports: [],
  templateUrl: './gift-card-stats.html',
  styleUrl: './gift-card-stats.scss',
})
export class GiftCardStats {
  giftCard = input<GiftCard>();
}
