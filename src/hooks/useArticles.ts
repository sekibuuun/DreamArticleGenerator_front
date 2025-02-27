import type { Article } from '@/types/index'
import { useEffect, useState } from 'react'

export const useArticles = (): {
	articles: Article[]
	loading: boolean
	error: string | null
} => {
	const [articles, setArticles] = useState<Article[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await fetch('/src/data/articlesDetail.json')

				if (!response.ok) {
					throw new Error(`データの取得に失敗しました: ${response.status}`)
				}

				const data = await response.json()
				setArticles(data.articles)
				setLoading(false)
			} catch (err) {
				setError(
					err instanceof Error ? err.message : '未知のエラーが発生しました',
				)
				setLoading(false)
				console.error('記事データの読み込みエラー:', err)
			}
		}

		fetchArticles()
	}, [])

	return { articles, loading, error }
}
