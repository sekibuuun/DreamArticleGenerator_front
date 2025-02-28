import type { Article } from '@/types/index'
import { useEffect, useState } from 'react'

export const useArticleDetail = (id: string | undefined) => {
	const [article, setArticle] = useState<Article | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		const fetchArticle = async () => {
			// IDが提供されていない場合は処理を中断
			if (!id) {
				setLoading(false)
				return
			}

			try {
				setLoading(true)
				setError(null)

				// JSONデータから該当するIDの記事を検索
				const response = await fetch(`http://127.0.0.1:5000/api/article/${id}`)
				if (!response.ok) {
					// 記事が見つからない場合はエラーをセット
					throw new Error('記事が見つかりませんでした')
				}

				const article: Article = await response.json()
				setArticle(article)
			} catch (fetchError) {
				console.error('記事の取得に失敗しました:', fetchError)

				// エラー時のモックデータ
				const mockArticle: Article = {
					id: id || '1',
					title: 'エラーが発生しました',
					content: 'データの取得中にエラーが発生しました。',
					author: 'システム',
					createdAt: new Date().toISOString().split('T')[0],
				}

				setArticle(mockArticle)
				setError(
					fetchError instanceof Error
						? fetchError
						: new Error('予期せぬエラーが発生しました'),
				)
			} finally {
				setLoading(false)
			}
		}

		fetchArticle()
	}, [id])

	return {
		article,
		loading,
		error,
	}
}
