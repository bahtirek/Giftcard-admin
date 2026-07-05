import { Component, inject, input, output, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../account/account.service';
import { GiftCard, GiftCardModel } from '../gift-card.interface';
import { GiftCardService } from '../gift-card.service';
import { Location } from '@angular/common';
import { GiftCardForm } from '../gift-card-form/gift-card-form';

@Component({
  selector: 'app-edit-gift-card',
  imports: [GiftCardForm],
  templateUrl: './edit-gift-card.html',
  styleUrl: './edit-gift-card.scss',
})
export class EditGiftCard {
  ngOnInit(): void {
    console.log('giftCardId:', this.id());
    this.getGiftCardById(this.id()!);
  }
  @ViewChild(GiftCardForm) giftCardFormComponentRef!: GiftCardForm;
  private location = inject(Location);
  router = inject(Router);
  accountService = inject(AccountService);
  giftCardService = inject(GiftCardService);

  id = input<string>();
  account = this.accountService.currentAccount;

  giftCard = signal<GiftCard | null>(null);
  onGiftCardEditEvent = output<string>()

  getGiftCardById(giftCardId: string) {
    this.giftCardService.getGiftCardById(giftCardId).subscribe({
      next: (giftCard: GiftCard) => {
        console.log('Gift Card:', giftCard);
        this.giftCard.set(giftCard);

      },
    });
  }

  onSubmitButtonClick() {
    this.giftCardFormComponentRef?.validateForm();
  }

  async onGiftCardSubmitEvent(giftCard: GiftCardModel) {
    this.giftCardService.onGiftCardEditSubmit(giftCard, this.id()!, this.account.value()!, () => this.onPostComplete())
  }

  onPostComplete ()  {
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }

}
