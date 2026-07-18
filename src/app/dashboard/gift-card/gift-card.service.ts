import { inject, Service, signal } from '@angular/core';
import { ExistingImage, GiftCard, GiftCardModel } from './gift-card.interface';
import { HttpClient, HttpContext, httpResource } from '@angular/common/http';
import { API_URL } from '../../app.config.tokens';
import { SHOW_LOADER } from '../../core/loader/loader-context.token';
import { uniqueId } from '../../helpers/uniqueid';
import { Account } from '../account/account-interface';
import { AccountService } from '../account/account.service';

@Service()
export class GiftCardService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);
  accountService = inject(AccountService);

  giftCards = signal<GiftCard[]>([]);
  giftCardId = signal<string>('');

  setGiftCardId(id: string | undefined) {
    if (id) {
      this.giftCardId.set(id);
    }
  }

  currentGiftCard = httpResource<GiftCard>(() => `${this.baseUrl}/gift-cards/${this.giftCardId()}`)

  tempImages: ExistingImage[] = []

  onGiftCardSubmit(giftCard: GiftCardModel, account: Account, onCompleteCallback: () => void) {
    const formData = new FormData();

    giftCard.imageFiles.forEach((file) => {
      if(!file.file) return;
      formData.append('files', file.file, file.name);
      this.tempImages.push({
        id: uniqueId(),
        name: file.name,
        url: `https://picsum.photos/seed/restaurant${uniqueId()}/400/300`,
      });
    });

    // If you need structured/nested data (arrays, objects), stringify it
    // formData.append('metadata', JSON.stringify({ tags: ['a', 'b'], userId: 42 }));

    this.http.post<GiftCard>(`${this.baseUrl}/gift-cards-images`, formData, {
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      next: (response) => {
        giftCard.images = this.tempImages;
        giftCard.imageFiles = []; // Clear the imageFiles after upload
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
        this.accountService.patchAccountGiftCards(account, response.id, onCompleteCallback);
      }
    })
  }

  getGiftCardById(giftCardId: string) {
    return this.http.get<GiftCard>( `${this.baseUrl}/gift-cards/${giftCardId}`)
  }

  onGiftCardEditSubmit(giftCard: GiftCardModel, giftCardId: string, account: Account, onCompleteCallback: () => void) {
    const formData = new FormData();

    giftCard.imageFiles.forEach((file) => {
      if(file.file && file.file.name && !file.isExisting) {
        formData.append('files', file.file, file.name);
        this.tempImages.push({
          id: uniqueId(),
          name: file.name,
          url: `https://picsum.photos/seed/restaurant${uniqueId()}/400/300`,
        });
      } if(file.isExisting && file.previewUrl) {
        this.tempImages.push({
          id: file.id,
          name: file.name,
          url: file.previewUrl,
        });
      }
    });

    this.http.post<GiftCard>(`${this.baseUrl}/gift-cards-images`, formData, {
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      next: (response) => {
        giftCard.images = this.tempImages;
        giftCard.imageFiles = []; // Clear the imageFiles after upload

        this.putGiftCard(giftCard, giftCardId, account, onCompleteCallback)
      },
    })
  }

  putGiftCard(giftCard: GiftCardModel, giftCardId: string, account: Account, onCompleteCallback: () => void) {
    giftCard.updatedAt = Date.now();
    giftCard.status = 'Active';

    this.http.put<GiftCard>(`${this.baseUrl}/gift-cards/${giftCardId}`, giftCard, {
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      next: (response) => {
        onCompleteCallback()
      }
    })
  }

  patchGiftCardStatus(status: string, onCompleteCallback: () => void) {
    this.http.patch(`${this.baseUrl}/gift-cards/${this.giftCardId()}`, {status: status}, {
      context: new HttpContext().set(SHOW_LOADER, true),
    }).subscribe({
      next: (response) => {
        console.log('Account satus updated:', response);
      },
      complete: () => {
        this.currentGiftCard.reload(); // Refresh the current account resource to get the updated data
        onCompleteCallback();
      },
    });
  }

  deleteGiftCard(onCompleteCallback: ()=> void) {
    this.http.delete(`${this.baseUrl}/gift-cards/${this.giftCardId()}`, {
      context: new HttpContext().set(SHOW_LOADER, true),
    }).subscribe({
      next: (response) => {
        console.log('Account satus updated:', response);
      },
      complete: () => {
        this.currentGiftCard.reload(); // Refresh the current account resource to get the updated data
        onCompleteCallback();
      },
    });
  }
}
