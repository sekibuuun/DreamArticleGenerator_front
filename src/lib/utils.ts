import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getDelayClass = (index: number) => {
	const delays = [
		'delay-0',
		'delay-100',
		'delay-200',
		'delay-300',
		'delay-400',
		'delay-500',
		'delay-700',
		'delay-1000',
	]
	return index < delays.length ? delays[index] : 'delay-1000'
}
