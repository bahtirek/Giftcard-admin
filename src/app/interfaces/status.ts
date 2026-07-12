import { Option } from "./options"

export enum StatusEnum {
  Active = 'Active',
  Inactive = 'Inactive',
  Pending = 'Pending',
}

export const StatusOptions: Option[] = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
  { value: 'Pending', label: 'Pending' },
]
