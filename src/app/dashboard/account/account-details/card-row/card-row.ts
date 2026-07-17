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
  onGiftCardViewEvent = output<string>();

  ngOnInit(): void {
    if(this.giftCardId() !== undefined) {
      this.getGiftCardById(this.giftCardId()!);
    }
  }

  getGiftCardById(giftCardId: string) {
    this.giftCardService.getGiftCardById(giftCardId).subscribe({
      next: (giftCard) => {
        this.giftCard.set(giftCard);
      },
    });
  }

  onGiftCardViewButtonClick() {
    this.onGiftCardViewEvent.emit(this.giftCardId()!);
  }
}
