import { Component, inject, signal, ViewChild } from '@angular/core';
import { GiftCardForm } from "../gift-card-form/gift-card-form";
import { GiftCardService } from '../gift-card.service';
import { GiftCardModel } from '../gift-card.interface';
import { Location } from '@angular/common';
import { AccountService } from '../../account/account.service';
import { GlobalSearch } from "../../common/global-search/global-search";
import { form, required } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-gift-card',
  imports: [GiftCardForm, GlobalSearch],
  templateUrl: './create-gift-card.html',
  styleUrl: './create-gift-card.scss',
})
export class CreateGiftCard {
  @ViewChild(GiftCardForm) giftCardFromComponentRef!: GiftCardForm;
  private location = inject(Location);
  private giftCardService = inject(GiftCardService)
  private accountService = inject(AccountService);
  private router = inject(Router)
  account = this.accountService.currentAccount;


  onSubmitButtonClick() {
    this.giftCardFromComponentRef?.validateForm();
  }

  async onGiftCardSubmitEvent(giftCard: GiftCardModel) {
    this.giftCardService.onGiftCardSubmit(giftCard, this.account.value()!, () => this.onPostComplete())
  }

  onPostComplete ()  {
    this.router.navigate(['dashboard/gift-card-details', this.accountService.accountId()])
  }

  onCancel() {
    this.location.back();
  }

  /* Account search */
  accountsSearchResults = this.accountService.accountsSearchResults;

  onInputChangeEvent(inputValue: string){
    this.accountService.setAccountsSearchQuery(inputValue)
  }

  onReset() {
    this.accountService.setAccountsSearchQuery('');
    this.queryForm().reset();
    this.queryModel.set({query: ''})
  }

  onAccountSelectButtonClick() {
    this.queryForm().markAsTouched();
    if(this.queryForm().valid()){
      if(this.queryForm().value().query === this.accountsSearchResults.value()![0].businessName) {
        this.accountService.setAccountId(this.accountsSearchResults.value()![0].id)
      }
    }
  }

  queryModel = signal({query: ''})

  queryForm = form(this.queryModel, (schemaPath) => {
    required(schemaPath.query, { message: 'Account is required' });
  });
}
