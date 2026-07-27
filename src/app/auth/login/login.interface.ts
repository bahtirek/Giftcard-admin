import { email, required, schema } from "@angular/forms/signals";

export interface Credentials {
  email: string,
  password: string,
}

export interface CredentialsModel {
  email: string,
  password: string,
}

export const initialCredentialsData = {
  email: '',
  password: '',
}

export const loginSchema = schema<CredentialsModel>((fieldPath) => {
  required(fieldPath.email, {message: 'Email is required'}),
  required(fieldPath.password, {message: 'Password is required'}),
  email(fieldPath.email, {message: 'Wrong email format'})
});

export interface Signup {
  password: string,
  confirmPassword?: string,
}

export interface SignupModel {
  password: string,
  confirmPassword: string,
}

export const initialSignupData = {
  password: '',
  confirmPassword: '',
}

export const signupSchema = schema<SignupModel>((fieldPath) => {
  required(fieldPath.password, {message: 'Password is required'}),
  required(fieldPath.confirmPassword, {message: 'Password confirmation is required'})
});
