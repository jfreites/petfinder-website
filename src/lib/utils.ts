import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validatePhoneNumber(phoneNumber: string) {
  //const mexicanPhoneNumberRegex = /^(?:52)?([1-9][0-9]{2,2})([0-9]{3,3})([0-9]{4})$/;
  return /^\d{10}$/.test(phoneNumber)
}
