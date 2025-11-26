import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

export function getRiskColor(score: number): string {
  if (score >= 70) return 'text-red-500'
  if (score >= 40) return 'text-yellow-500'
  return 'text-green-500'
}

export function getRiskBgColor(score: number): string {
  if (score >= 70) return 'bg-red-500/20'
  if (score >= 40) return 'bg-yellow-500/20'
  return 'bg-green-500/20'
}