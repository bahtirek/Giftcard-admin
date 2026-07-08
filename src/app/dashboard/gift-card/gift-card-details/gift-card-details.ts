import { Component, inject, input } from '@angular/core';
import { GiftCardHero } from './gift-card-hero/gift-card-hero';
import { GiftCardStats } from './gift-card-stats/gift-card-stats';
import { GiftCardOverview } from './gift-card-overview/gift-card-overview';
import { GiftCardOrders } from './gift-card-orders/gift-card-orders';
import { Router } from '@angular/router';
import { GiftCardService } from '../gift-card.service';

@Component({
  selector: 'app-gift-card-details',
  imports: [GiftCardHero, GiftCardStats, GiftCardOverview, GiftCardOrders],
  templateUrl: './gift-card-details.html',
  styleUrl: './gift-card-details.scss',
})
export class GiftCardDetails {
  router = inject(Router);
  giftCardService = inject(GiftCardService);

  id = input<string>();
  giftCard = this.giftCardService.currentGiftCard;

  ngOnInit() {
    this.giftCardService.setGiftCardId(this.id());
  }

  onAddCardButtonClicked() {
    this.router.navigate(['dashboard/create-gift-card']);
  }

  onGiftCardEditEvent(giftCardId: string) {
    this.router.navigate(['dashboard/edit-gift-card', giftCardId]);
  }

  onGiftCardViewEvent(giftCardId: string) {
    this.router.navigate(['dashboard/gift-card-details', giftCardId]);
  }
}
