export interface Profile {
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

export const initialProfileData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: '',
  status: '',
  createdBy: '',
  updatedBy: '',
}
