import { inject, Service, signal } from '@angular/core';
import { existingImage, GiftCard, GiftCardModel } from './gift-card.interface';
import { HttpClient, HttpContext } from '@angular/common/http';
import { API_URL } from '../../app.config.tokens';
import { SHOW_LOADER } from '../../core/loader/loader-context.token';
import { uniqueId } from '../../helpers/uniqueid';
import { Account } from '../account/account-interface';

@Service()
export class GiftCardService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);

  giftCards = signal<GiftCard[]>([]);

  tempImages: existingImage[] = []

  onGiftCardSubmit(giftCard: GiftCardModel, account: Account, onCompleteCallback: () => void) {
    const formData = new FormData();
    console.log('Gift Card Image Files:', giftCard);


    // Append multiple files
    giftCard.imageFiles.forEach((file) => {
      formData.append('files', file, file.name);
      this.tempImages.push({
        id: uniqueId(),
        name: file.name,
        url: `https://picsum.photos/seed/restaurant${uniqueId()}/400/300`,
      });
      console.log('Gift Card Image File:', file);

    });

    // If you need structured/nested data (arrays, objects), stringify it
    formData.append('metadata', JSON.stringify({ tags: ['a', 'b'], userId: 42 }));

    this.http.post<GiftCard>(`${this.baseUrl}/gift-cards-images`, formData, {
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      next: (response) => {
        giftCard.images = this.tempImages;
        console.log('Gift Card Images Uploaded:', response);
        console.log('Gift Card Images Uploaded:', giftCard.images);
        console.log('Gift Card Images Uploaded:', this.tempImages);

        this.postGiftCard(giftCard, account, onCompleteCallback)
      },
    })
  }

  postGiftCard(giftCard: GiftCardModel, account: Account, onCompleteCallback: () => void) {
    giftCard.createdAt = Date.now();
    giftCard.status = 'Active';

    this.http.post<GiftCard>(`${this.baseUrl}/gift-cards`, giftCard, {
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      next: (response) => {
        this.patchAccount(account, response.id, onCompleteCallback);
      }
    })
  }

  patchAccount(account: Account, giftCardId: string, onCompleteCallback: () => void) {
    this.http.patch(`${this.baseUrl}/accounts/${account.id}`, {
      giftCards: [...account.giftCards || [], giftCardId]
    }).subscribe({
      next: (response) => {
        console.log('Account updated with new gift card:', response);
      },
      complete: () => {
        onCompleteCallback()
      },
    });
  }
}
