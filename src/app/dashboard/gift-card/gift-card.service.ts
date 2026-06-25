import { Service } from '@angular/core';
import { GiftCardModel } from './gift-card.interface';

@Service()
export class GiftCardService {
  postGiftCard(giftCard: GiftCardModel, arg1: () => void) {
    throw new Error('Method not implemented.');
  }
}
