import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTime = (datestring: string) => {
  const date = new Date(datestring)
  const hours = padZero(date.getHours())
  const minutes = padZero(date.getMinutes())
  return `${hours}:${minutes}`
}

// Helper function to pad single digit numbers with leading zero
const padZero = (num: number) => num.toString().padStart(2, '0')