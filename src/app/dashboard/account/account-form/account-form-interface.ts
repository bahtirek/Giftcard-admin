import { email, form, minLength, required, schema } from "@angular/forms/signals";

export interface Account {
  businessName: string;
  businessType: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  notes: string;
}

export const initialAccountData: Account = {
  businessName: '',
  businessType: 'Restaurant',
  phone: '',
  email: '',
  website: '',
  address: '',
  notes: ''
};


export const accountSchema = schema<Account>((fieldPath) => {
  required(fieldPath.businessName, {message: 'Business name is required'}),
  required(fieldPath.businessType, {message: 'Business type is required'}),
  email(fieldPath.email, {message: 'Email is required'}),
  required(fieldPath.email, {message: 'Email is required'}),
  minLength(fieldPath.email, 5, {message: 'Email must be at least 5 characters'}),
  required(fieldPath.phone, {message: 'Phone is required'}),
  required(fieldPath.address, {message: 'Address is required'})
});
