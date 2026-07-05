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
  id: string;
  name: string;
  type: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  images: ExistingImage[];
  amounts: string[];
  address: Address;
  createdAt?: number;
  status?: string;
  updatedAt?:number;
  geoPosition?: GeoPosition;
  amount1: string;
  amount2: string;
  amount3: string;
  imageFiles: UploadedFileItem[];
}

export interface GiftCardModel {
  name: string;
  type: string;
  phone?: string;
  email?: string;
  website?: string;
  description: string;
  imageFiles: UploadedFileItem[];
  amount1: string;
  amount2: string;
  amount3: string;
  address: Address;
  geoPosition?: GeoPosition;
  status?: string;
  createdAt?:number;
  images?: ExistingImage[];
  updatedAt?:number;
}

export interface ExistingImage {
  id: string;
  url: string;
  name: string;
  sizeLabel?: string
}

export interface UploadedFileItem {
  /** Stable id for *ngFor tracking and removal. */
  id: string;
  /** The raw File object — null for pre-existing files loaded via inputs. */
  file: File | null;
  name: string;
  sizeLabel: string;
  previewUrl: string | null;
  /** True if this came from existingFiles rather than a fresh user selection. */
  isExisting: boolean;
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
  },
  status: 'Active'
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




