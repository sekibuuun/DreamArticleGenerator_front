import type { ReactNode } from 'react'

export type MessageBubbleProps = {
	message: string
	role: 'user' | 'assistant'
	className?: string
}

export type Article = {
	id: number | string
	title: string
	excerpt?: string
	date?: string
	author?: string
	readTime?: string
	content?: string
	createdAt?: string
	timestamp?: string
	summary?: string
}

export type PetalDensity = 'low' | 'medium' | 'high'

export type Petal = {
	id: number
	x: number
	y: number
	size: number
	rotation: number
	speed: number
	delay: number
	opacity: number
	pinkness?: number
	driftAmplitude: number
	driftSpeed?: number
	petalType: number
}

export type ArticleListsProps = {
	id: number
	title: string
	index: number
	summary: string
	date: string
}

export type JudgeButtonProps = {
	isGenerating: boolean
	isVisible: boolean
	onGenerateArticle: () => void
	onClose: () => void
}

export type ChatContextType = {
	chatId: number
	setChatId: (id: number) => void
}

export type UseChatButtonReturn = {
	isHovered: boolean
	setIsHovered: React.Dispatch<React.SetStateAction<boolean>>
}

export type Message = {
	id: number
	role: 'user' | 'assistant'
	content: string
}

export type ChatResponse = {
	response: string
}

export type GenerateArticleResponse = {
	id: number
	title: string
	content: string
}

export type ArticlePreviewProps = {
	isOpen?: boolean
	onClose: () => void
	articleResponse: GenerateArticleResponse | null
}

export type ErrorBoundaryProps = {
	children: ReactNode
	fallback: React.ComponentType<{ error: Error }>
}

export type ErrorBoundaryState = {
	hasError: boolean
	error: Error | null
}

export interface PromiseWithStatus<T> extends Promise<T> {
	status?: 'pending' | 'fulfilled' | 'rejected'
	value?: T
	reason?: Error | unknown
}
