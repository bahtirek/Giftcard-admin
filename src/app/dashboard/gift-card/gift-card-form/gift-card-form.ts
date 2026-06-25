import { Component, effect, signal, ChangeDetectionStrategy, output, input, OnInit } from '@angular/core';
import { GiftCardModel, initialGiftCardData, GiftCard, giftCardSchema, existingImages } from '../gift-card.interface';
import { form } from '@angular/forms/signals';
import { Option } from '../../../interfaces/options';
import { AppInput } from '../../../common/forms/input/input';
import { Select } from '../../../common/forms/select/select';
import { Textarea } from '../../../common/forms/textarea/textarea';
import { FileInput } from '../../../common/forms/file-input/file-input';
import { MultiFileInput } from '../../../common/forms/multi-file-input/multi-file-input';

@Component({
  selector: 'app-gift-card-form',
  imports: [AppInput, Select, Textarea, MultiFileInput],
  templateUrl: './gift-card-form.html',
  styleUrl: './gift-card-form.scss',
})
export class GiftCardForm implements OnInit {
  ngOnInit(): void {
    /* if(this.giftCard()?.id) {
      const editingGiftCard: GiftCardModel = this.giftCard() as GiftCardModel;
      this.giftCardModel.set(editingGiftCard)
    } */
  }

  giftCard = input<GiftCard>()

  giftCardModel = signal<GiftCardModel>(initialGiftCardData);

  giftCardForm = form(this.giftCardModel, giftCardSchema);

  existingImages: existingImages[] = [
    {
      id: '1',
      url: 'https://picsum.photos/seed/restaurant1_1/400/300',
      name: 'Image 1'
    },
    {
      id: '',
      url: 'https://picsum.photos/seed/restaurant1_2/400/300',
      name: 'Image 2'
    },
    {
      id: '3',
      url: 'https://picsum.photos/seed/restaurant1_3/400/300',
      name: 'Image 3'
    },
    {
      id: '4',
      url: 'https://picsum.photos/seed/restaurant1_4/400/300',
      name: 'Image 4'
    },
  ]

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

  onFilesChanged(event: File[]){
    console.log(event);

  }

  onExistingFilesChanged(event: existingImages[]){
    console.log(event);
  }

  onExistingFileRemoved(event: string){
    console.log(event);
  }
}
