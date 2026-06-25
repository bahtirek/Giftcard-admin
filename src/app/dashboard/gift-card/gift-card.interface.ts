import { required, schema } from "@angular/forms/signals";


export interface Address {
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface GeoPosition {
  lat: string,
  long: string
}

export interface GiftCard {
  name: string;
  type: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  images: existingImages[];
  amounts: string[];
  address: Address;
  createdAt?: number;
  status?: string;
  updatedAt?:number;
  geoPosition?: GeoPosition
}

export interface GiftCardModel {
  name: string;
  type: string;
  phone?: string;
  email?: string;
  website?: string;
  description: string;
  imageFiles: File[];
  amount1: string;
  amount2: string;
  amount3: string;
  address: Address;
  geoPosition?: GeoPosition
}

export interface existingImages {
  id: string;
  url: string;
  name: string;
  sizeLabel?: string
}

export const initialGiftCardData: GiftCardModel = {
  name: '',
  type: '',
  phone: '',
  email: '',
  website: '',
  address: {
    addressLineOne: '',
    addressLineTwo: '',
    city: '',
    state: '',
    zipCode: ''
  },
  description: '',
  imageFiles: [],
  amount1: '',
  amount2: '',
  amount3: '',
  geoPosition: {
    lat: '',
    long: ''
  }
};

export const giftCardSchema = schema<GiftCardModel>((fieldPath) => {
  required(fieldPath.name, {message: 'Name is required'}),
  required(fieldPath.type, {message: 'Type is required'}),
  required(fieldPath.description, {message: 'Description is required'}),
  required(fieldPath.address.addressLineOne, {message: 'Address is required'}),
  required(fieldPath.address.city, {message: 'City is required'}),
  required(fieldPath.address.state, {message: 'State is required'}),
  required(fieldPath.amount1, {message: 'Amount is required'}),
  required(fieldPath.amount2, {message: 'Amount is required'}),
  required(fieldPath.amount3, {message: 'Amount is required'})
});




