import { Component, inject, input, output, signal } from '@angular/core';
import { GiftCardService } from '../../../gift-card/gift-card.service';
import { GiftCard } from '../../../gift-card/gift-card.interface';

@Component({
  selector: 'app-card-row',
  imports: [],
  templateUrl: './card-row.html',
  styleUrl: './card-row.scss',
})
export class CardRow {
  giftCardId = input<string>();
  giftCardService = inject(GiftCardService);
  giftCard = signal<GiftCard | null>(null);
  onGiftCardEditEvent = output<string>()

  ngOnInit(): void {
    console.log('giftCardId:', this.giftCardId);
    if(this.giftCardId() !== undefined) {
      this.getGiftCardById(this.giftCardId()!);
    }
  }

  getGiftCardById(giftCardId: string) {
    this.giftCardService.getGiftCardById(giftCardId).subscribe({
      next: (giftCard) => {
        console.log('Gift Card:', giftCard);
        this.giftCard.set(giftCard);
      },
    });
  }

  onGiftCardEditButtonClick() {
    console.log('Edit button clicked for gift card:', this.giftCard()?.name);
    this.onGiftCardEditEvent.emit(this.giftCardId()!);
  }
}
