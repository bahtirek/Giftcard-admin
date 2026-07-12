import { Component, effect, signal, untracked, output, input, OnInit, inject } from '@angular/core';
import { GiftCardModel, initialGiftCardData, GiftCard, giftCardSchema, ExistingImage, UploadedFileItem } from '../gift-card.interface';
import { form } from '@angular/forms/signals';
import { Option } from '../../../interfaces/options';
import { AppInput } from '../../../common/forms/input/input';
import { Textarea } from '../../../common/forms/textarea/textarea';
import { MultiFileInput } from '../../../common/forms/multi-file-input/multi-file-input';
import { Checkbox } from "../../../common/forms/checkbox/checkbox";
import { Account } from '../../account/account-interface';
import { Router } from '@angular/router';
import { Select } from '../../../common/forms/select/select';
import { StatusOptions } from '../../../interfaces/status';

@Component({
  selector: 'app-gift-card-form',
  imports: [AppInput, Textarea, MultiFileInput, Checkbox, Select],
  templateUrl: './gift-card-form.html',
  styleUrl: './gift-card-form.scss',
})
export class GiftCardForm implements OnInit {
  ngOnInit(): void {
    if(!this.account()?.id) {
      this.router.navigate(['/dashboard/all-accounts']);
    } else {
      this.giftCardModel.set({...initialGiftCardData, type: this.account()?.businessType!});
    }
  }

  editingCardWatchEffect = effect(() => {
    if(!this.giftCard()) return;
    untracked(() => this.setEditingGiftCardModel());
  });

  setEditingGiftCardModel() {
    const editingGiftCard: GiftCardModel = this.giftCard()! as GiftCardModel;
    this.giftCardModel.set({...editingGiftCard});
    this.existingImages.set(this.giftCard()!.images);
  }

  statusOptions = signal<any>(StatusOptions)

  router = inject(Router)

  account = input<Account>();

  giftCard = input<GiftCard | null>();

  giftCardModel = signal<GiftCardModel>(initialGiftCardData);

  giftCardForm = form(this.giftCardModel, giftCardSchema);

  addressCheckboxModel = signal<{checkbox: boolean}>({checkbox: false})

  addressCheckboxForm = form(this.addressCheckboxModel)

  existingImages = signal<ExistingImage[]>([]);

  options = signal<Option[]>([
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Service', label: 'Service' },
    { value: 'Grocery', label: 'Grocery' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Other', label: 'Other' },
  ]);

  validateForm() {
    this.giftCardForm().markAsTouched();

    if (this.giftCardForm().valid()) {
      this.submitGiftCard.emit(this.giftCardModel());
    }
  }

  submitGiftCard = output<GiftCardModel>();

  onFilesChanged(event: UploadedFileItem[]){
    console.log(event);
    this.giftCardModel.set({...this.giftCardModel(), imageFiles: event});
  }

  onExistingFilesChanged(event: ExistingImage[]){
    console.log(event);
  }

  onExistingFileRemoved(event: string){
    console.log(event);
  }

  checkboxWatchEffect = effect(() => {
    console.log('Checkbox value changed:', this.addressCheckboxModel().checkbox);
    if(this.addressCheckboxModel().checkbox) {
      untracked(() => this.setAccountAddress());
    } else {
      untracked(() => this.setInitialAddress());
    }
  })

  setAccountAddress() {
    const current = this.giftCardModel();
    if (this.account()?.address.addressLineOne) {
      this.giftCardModel.set({ ...current, address: this.account()!.address });
    }
  }
  setInitialAddress() {
    const current = this.giftCardModel();
    this.giftCardModel.set({ ...current, address: initialGiftCardData.address });
  }
}
