// 記事データの型定義
export interface Article {
	id: number
	title: string
	excerpt: string
	date: string
	category: string
	imageUrl?: string
	author: string
	readTime: string
}

// 花びらのアニメーション用の型定義
export interface Petal {
	id: number
	left: string
	top: string
	size: number
	delay: number
	duration: number
	rotate: number
}
