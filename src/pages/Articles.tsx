import type React from 'react'
import { DividerIcon } from '../assets/SocialIcons'
import { AnimatedPetals } from '../components/AnimatedPetals'
import { ArticlePetal } from '../components/ArticlePetal'
import { CherryBlossom } from '../components/CherryBlossom'
import { useArticles } from '../hooks/useArticles'
import { useScrollToTop } from '../hooks/useScrollToTop'

export function Articles(): React.ReactNode {
	// カスタムフックを使用してデータとスクロール動作を取得
	const { articles, loading, error } = useArticles()
	useScrollToTop()

	// 花びらの密度設定（中程度）
	const petalDensity = 'medium'

	return (
		<div className="min-h-screen bg-gradient-to-b from-pink-50 via-pink-50 to-white relative overflow-hidden">
			{/* リアルな桜の木と背景 */}
			<CherryBlossom className="fixed inset-0 w-full h-full object-cover pointer-events-none" />

			{/* アニメーションする花びらエフェクト */}
			<AnimatedPetals count={40} density={petalDensity} />

			{/* メインコンテンツ */}
			<div className="relative z-10 container mx-auto px-4 py-8">
				{/* シンプルなタイトル */}
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-pink-800 relative inline-block">
						桜物語
						<span className="absolute bottom-0 left-0 right-0 h-1 bg-pink-400 rounded-full" />
					</h1>
				</div>

				{/* ローディング表示 */}
				{loading && (
					<div className="flex justify-center items-center py-20">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500" />
					</div>
				)}

				{/* エラー表示 */}
				{error && (
					<div className="text-center py-10">
						<div
							className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
							role="alert"
						>
							<strong className="font-bold">エラー: </strong>
							<span className="block sm:inline">{error}</span>
						</div>
					</div>
				)}

				{/* 記事グリッド */}
				{!loading && !error && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
						{articles.map((article, index) => (
							<ArticlePetal
								key={article.id}
								article={article}
								index={index}
								className="transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg"
							/>
						))}
					</div>
				)}

				{/* 和風の装飾的な区切り線 */}
				{!loading && !error && (
					<div className="mt-16 flex items-center justify-center">
						<div className="w-16 h-px bg-pink-200" />
						<div className="mx-4">
							<DividerIcon />
						</div>
						<div className="w-16 h-px bg-pink-200" />
					</div>
				)}
			</div>
		</div>
	)
}

export default Articles
