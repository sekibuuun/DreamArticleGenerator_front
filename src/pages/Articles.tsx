import { ArticleLists } from '@/components/ArticleLists'
import { ChatButton } from '@/components/ChatButton'
import { CherryBlossom } from '@/components/CherryBlossom'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { fetchArticles } from '@/lib/api'
import type { Article } from '@/types'
import type React from 'react'
import { useEffect, useState } from 'react'

// ローディング表示コンポーネント
function LoadingSpinner() {
	return (
		<div className="flex justify-center items-center py-20">
			<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500" />
		</div>
	)
}

// エラー表示コンポーネント
function ErrorDisplay({ error }: { error: Error }) {
	return (
		<div className="text-center py-10">
			<div
				className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
				role="alert"
			>
				<strong className="font-bold">エラー: </strong>
				<span className="block sm:inline">{error.message}</span>
			</div>
		</div>
	)
}

// 記事コンテンツコンポーネント - useEffect を使用する従来のアプローチ
function ArticlesContent() {
	const [articles, setArticles] = useState<Article[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		let isMounted = true

		const loadArticles = async () => {
			try {
				const data = await fetchArticles()
				if (isMounted) {
					setArticles(data)
					setLoading(false)
				}
			} catch (err) {
				if (isMounted) {
					setError(
						err instanceof Error
							? err
							: new Error('記事の取得中にエラーが発生しました'),
					)
					setLoading(false)
				}
			}
		}

		loadArticles()

		return () => {
			isMounted = false
		}
	}, [])

	if (loading) {
		return <LoadingSpinner />
	}

	if (error) {
		return <ErrorDisplay error={error} />
	}

	// 記事がない場合
	if (!articles || articles.length === 0) {
		return (
			<div className="text-center py-10">
				<div className="bg-pink-50 border border-pink-200 text-pink-700 px-4 py-6 rounded-lg shadow-sm">
					<p className="text-lg font-medium">記事はありません</p>
					<p className="mt-2 text-pink-600">
						新しい記事が投稿されるまでお待ちください
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
			{articles.map((article, index) => {
				return (
					<ArticleLists
						key={article.id}
						id={article.id as number}
						title={article.title as string}
						index={index}
						summary={article.summary as string}
						date={article.timestamp as string}
					/>
				)
			})}
		</div>
	)
}

export function Articles(): React.ReactNode {
	useScrollToTop()

	return (
		<div className="min-h-screen bg-gradient-to-b from-pink-50 via-pink-50 to-white relative overflow-hidden">
			{/* リアルな桜の木と背景 */}
			<CherryBlossom />
			{/* メインコンテンツ */}
			<div className="relative z-10 container mx-auto px-4 py-8">
				{/* シンプルなタイトル */}
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-pink-800 relative inline-block">
						みんなの夢
						<span className="absolute bottom-0 left-0 right-0 h-1 bg-pink-400 rounded-full" />
					</h1>
				</div>

				<ErrorBoundary fallback={ErrorDisplay}>
					<ArticlesContent />
				</ErrorBoundary>
			</div>
			<ChatButton />
		</div>
	)
}
