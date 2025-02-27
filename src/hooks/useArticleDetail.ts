import { useEffect, useState } from 'react'

// 記事の型定義
export type Article = {
	id: string
	title: string
	content: string
	author: string
	createdAt: string
}

export const useArticleDetail = (id: string | undefined) => {
	const [article, setArticle] = useState<Article | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// 実際の環境では、APIから記事データを取得する処理を実装
		// 現在はモックデータを使用
		const fetchArticle = async () => {
			try {
				setLoading(true)

				// モックデータ（実際の実装ではAPIリクエストに置き換え）
				const mockArticle: Article = {
					id: id || '1',
					title: '夢を追いかける勇気について',
					content: '',
					author: '山田花子',
					createdAt: '2024-03-15',
				}

				setArticle(mockArticle)
			} catch (error) {
				console.error('記事の取得に失敗しました:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchArticle()
	}, [id])

	return {
		article,
		loading,
	}
}
