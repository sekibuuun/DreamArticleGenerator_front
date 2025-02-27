import { useEffect, useState } from 'react'
import articlesData from '../data/articles.json'

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
                const foundArticle = articlesData.articles.find(a => a.id === id)

                if (!foundArticle) {
                    // 記事が見つからない場合はエラーをセット
                    throw new Error('記事が見つかりませんでした')
                }

                // 遅延を模倣（実際のAPIフェッチを想定）
                await new Promise(resolve => setTimeout(resolve, 500))

                setArticle(foundArticle)
            } catch (fetchError) {
                console.error('記事の取得に失敗しました:', fetchError)
                
                // エラー時のモックデータ
                const mockArticle: Article = {
                    id: id || '1',
                    title: 'エラーが発生しました',
                    content: 'データの取得中にエラーが発生しました。',
                    author: 'システム',
                    createdAt: new Date().toISOString().split('T')[0]
                }

                setArticle(mockArticle)
                setError(fetchError instanceof Error ? fetchError : new Error('予期せぬエラーが発生しました'))
            } finally {
                setLoading(false)
            }
        }

        fetchArticle()
    }, [id])

    return {
        article,
        loading,
        error
    }
}