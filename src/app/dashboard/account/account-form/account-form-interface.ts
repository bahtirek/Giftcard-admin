import { email, form, minLength, required, schema, SchemaPath, validate } from "@angular/forms/signals";

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
  businessType: '',
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
  required(fieldPath.address, {message: 'Address is required'}),
  url(fieldPath.website, {message: 'Website is required'}),
  phoneNumber(fieldPath.phone, {message: 'Phone is required'})
});

function url(path: SchemaPath<string>, options?: {message?: string}) {
  validate(path, ({value}) => {
    try {
      new URL(value());
      return null;
    } catch {
      return {
        kind: 'url',
        message: options?.message || 'Enter a valid URL',
      };
    }
  });
}

function phoneNumber(path: SchemaPath<string>, options?: {message?: string}) {
  validate(path, ({value}) => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(value())) {
      return {
        kind: 'phoneNumber',
        message: options?.message || 'Phone must be in format: 555-123-4567',
      };
    }
    return null;
  });
}
