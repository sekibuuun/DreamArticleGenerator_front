export type Article = {
	id: number
	title: string
	excerpt: string
	date: string
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
	pinkness: number
	driftAmplitude: number
	driftSpeed: number
	petalType: number
}

export type AnimatedPetalsProps = {
	count: number
	density: PetalDensity
}

export type ArticlePetalProps = {
	article: Article
	index: number
	className?: string
}
