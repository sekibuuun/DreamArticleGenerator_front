import { SakuraBackground } from '@/components/SakuraBackground'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useArticleDetail } from '@/hooks/useArticleDetail'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router'
import { Link } from 'react-router'

export const ArticleDetail = () => {
	const { id } = useParams<{ id: string }>()
	const { article, loading, error } = useArticleDetail(id)

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white">
				<div className="text-pink-500">読み込み中...</div>
			</div>
		)
	}

	if (error || !article) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white">
				<div className="text-center">
					<p className="text-xl text-pink-800 mb-4">
						{error ? error.message : '記事が見つかりませんでした'}
					</p>
					<Link to="/">
						<Button>記事一覧に戻る</Button>
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className="relative min-h-screen bg-gradient-to-b from-pink-50 to-white">
			<SakuraBackground />

			<div className="container mx-auto px-4 py-8 max-w-4xl relative">
				{/* 戻るボタン */}
				<Link
					to="/"
					className="inline-flex items-center mb-6 text-pink-700 hover:text-pink-900 transition-colors"
				>
					<ArrowLeft className="h-4 w-4 mr-2" />
					<span>記事一覧に戻る</span>
				</Link>

				{/* 記事カード */}
				<Card className="bg-white/90 backdrop-blur-md border-pink-50 shadow-lg rounded-xl overflow-hidden">
					{/* ヘッダー */}
					<div className="p-6 md:p-8 border-b border-pink-100">
						<h1 className="text-3xl md:text-4xl font-bold text-pink-800 font-japanese mb-4">
							{article.title}
						</h1>

						{/* メタ情報 */}
						<div className="flex flex-wrap gap-4 text-sm text-pink-600">
							<div className="flex items-center">
								<User className="h-4 w-4 mr-1" />
								<span>{article.author}</span>
							</div>
							<div className="flex items-center">
								<Calendar className="h-4 w-4 mr-1" />
								<span>{article.createdAt}</span>
							</div>
						</div>
					</div>

					{/* 記事内容 */}
					<CardContent className="p-6 md:p-8">
						<div className="prose prose-pink max-w-none">
							<ReactMarkdown>{article.content}</ReactMarkdown>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
