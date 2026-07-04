import { Component, inject, ViewChild } from '@angular/core';
import { GiftCardForm } from "../gift-card-form/gift-card-form";
import { GiftCardService } from '../gift-card.service';
import { GiftCardModel } from '../gift-card.interface';
import { Location } from '@angular/common';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-create-gift-card',
  imports: [GiftCardForm],
  templateUrl: './create-gift-card.html',
  styleUrl: './create-gift-card.scss',
})
export class CreateGiftCard {
  @ViewChild(GiftCardForm) giftCardFromComponentRef!: GiftCardForm;
  accountService = inject(AccountService);
  account = this.accountService.currentAccount;

  private location = inject(Location);
  private giftCardService = inject(GiftCardService)


  onSubmitButtonClick() {
    this.giftCardFromComponentRef?.validateForm();
  }

  async onGiftCardSubmitEvent(giftCard: GiftCardModel) {
    this.giftCardService.onGiftCardSubmit(giftCard, this.account.value()!, () => this.onPostComplete())
  }

  onPostComplete ()  {
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }
}
