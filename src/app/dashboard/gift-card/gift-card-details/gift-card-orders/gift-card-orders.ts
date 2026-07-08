import { Component, input } from '@angular/core';
import { GiftCard } from '../../gift-card.interface';

@Component({
  selector: 'app-gift-card-orders',
  imports: [],
  templateUrl: './gift-card-orders.html',
  styleUrl: './gift-card-orders.scss',
})
export class GiftCardOrders {
  giftCard = input<GiftCard>();
}
