import type { PetalDensity } from '@/types/index'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getOpacityClass = (baseDensity: PetalDensity): string => {
	switch (baseDensity) {
		case 'low':
			return 'opacity-50'
		case 'medium':
			return 'opacity-70'
		case 'high':
			return 'opacity-90'
		default:
			return 'opacity-70'
	}
}

export const getRandomInRange = (min: number, max: number): number => {
	return min + Math.random() * (max - min)
}

export const formatDate = (dateString: string): string => {
	const date = new Date(dateString)
	return date.toLocaleDateString('ja-JP', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}
