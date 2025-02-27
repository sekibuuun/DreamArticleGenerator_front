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
	article: Article
	index: number
}

export type JudgeButtonProps = {
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
