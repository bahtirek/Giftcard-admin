import { email, minLength, required, schema } from "@angular/forms/signals";

export interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  role: string,
  status: string,
  createdBy?: string,
  updatedBy?: string,
  createdAt?: number,
  updatedAt?: number,
}

export interface UserModel {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  role: string,
  status: string,
}

export const initialUserData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: 'Sales Person',
  status: 'Active',
}


export const userSchema = schema<UserModel>((fieldPath) => {
  required(fieldPath.firstName, {message: 'First name is required'}),
  required(fieldPath.lastName, {message: 'Last name is required'}),
  email(fieldPath.email, {message: 'Email is required'}),
  required(fieldPath.email, {message: 'Email is required'}),
  minLength(fieldPath.email, 5, {message: 'Email must be at least 5 characters'}),
  required(fieldPath.phone, {message: 'Phone is required'})
  //url(fieldPath.website, {message: 'Website is required'})
  //phoneNumber(fieldPath.phone, {message: 'Phone is required'})
});
