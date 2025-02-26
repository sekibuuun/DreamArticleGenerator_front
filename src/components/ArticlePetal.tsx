import type React from 'react'
import { useEffect, useState } from 'react'
import type { Article } from '../types'

interface ArticlePetalProps {
	article: Article
	index: number
	className?: string
}

export const ArticlePetal: React.FC<ArticlePetalProps> = ({
	article,
	index,
	className,
}) => {
	// ホバー状態の管理
	const [isHovered, setIsHovered] = useState(false)
	const [isVisible, setIsVisible] = useState(false)

	// コンポーネントがマウントされたらフェードイン効果を開始
	useEffect(() => {
		// 少し遅延を入れて段階的に表示
		const timer = setTimeout(() => {
			setIsVisible(true)
		}, index * 100) // インデックスに応じて遅延時間を調整

		return () => clearTimeout(timer)
	}, [index])

	// 記事カードの背景色を交互に変更するための配列
	const bgColors = [
		'bg-gradient-to-br from-white to-pink-50',
		'bg-gradient-to-br from-white to-pink-100',
		'bg-gradient-to-br from-white to-rose-50',
	]

	// 日付をフォーマット
	const formatDate = (dateString: string): string => {
		const date = new Date(dateString)
		return new Intl.DateTimeFormat('ja-JP', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}).format(date)
	}

	return (
		<article
			className={`
        relative rounded-xl overflow-hidden shadow-sm
        ${bgColors[index % bgColors.length]}
        border border-pink-100
        ${className || ''}
        transition-all duration-500 ease-in-out
      `}
			style={{
				opacity: isVisible ? 1 : 0,
				transform: `translateY(${isVisible ? 0 : 20}px)`,
				transition: 'opacity 0.5s ease, transform 0.5s ease',
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* 花びらの装飾（左上） */}
			<div className="absolute -top-2 -left-2 w-12 h-12 text-pink-200 opacity-50 z-10">
				<svg viewBox="0 0 24 24" fill="currentColor">
					<path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M11,9.93v4.14c0,0.55,0.45,1,1,1s1-0.45,1-1V9.93c0.61-0.35,1-0.99,1-1.72c0-1.1-0.9-2-2-2s-2,0.9-2,2C10,8.94,10.39,9.58,11,9.93z" />
				</svg>
			</div>

			<div className="p-6">
				{/* 著者情報と読了時間 */}
				<div className="flex justify-between items-center text-xs text-gray-500 mb-2">
					<div className="flex items-center">
						<svg
							className="w-4 h-4 mr-1 text-pink-400"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
							<circle cx="12" cy="7" r="4" />
						</svg>
						<span>{article.author}</span>
					</div>
					<div className="flex items-center">
						<svg
							className="w-4 h-4 mr-1 text-pink-400"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							<circle cx="12" cy="12" r="10" />
							<polyline points="12 6 12 12 16 14" />
						</svg>
						<span>{article.readTime}読了</span>
					</div>
				</div>

				{/* 記事タイトル */}
				<h2 className="text-xl font-bold text-gray-800 mb-2 group">
					<a
						href={`/article/${article.id}`}
						className="block transition-colors relative"
						style={{ color: isHovered ? '#be185d' : '#1f2937' }}
					>
						{article.title}
						<span className="absolute inset-0" aria-hidden="true" />
					</a>
				</h2>

				{/* 記事概要 */}
				<p className="text-gray-600 mb-4 line-clamp-3 text-sm">
					{article.excerpt}
				</p>

				{/* 記事のメタ情報 */}
				<div className="flex justify-between items-center text-sm">
					<time dateTime={article.date} className="text-gray-500">
						{formatDate(article.date)}
					</time>

					<div
						className={`
            flex items-center text-pink-700 transition-all duration-300
            ${isHovered ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}
          `}
					>
						<span>続きを読む</span>
						<svg
							className="w-4 h-4 ml-1"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</div>
				</div>
			</div>

			{/* 花びら型の装飾（右下） */}
			<div className="absolute -bottom-2 -right-2 w-10 h-10 text-pink-200 transform rotate-45 opacity-50">
				<svg viewBox="0 0 24 24" fill="currentColor">
					<path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M11,9.93v4.14c0,0.55,0.45,1,1,1s1-0.45,1-1V9.93c0.61-0.35,1-0.99,1-1.72c0-1.1-0.9-2-2-2s-2,0.9-2,2C10,8.94,10.39,9.58,11,9.93z" />
				</svg>
			</div>

			{/* ホバー時のオーバーレイ効果 */}
			<div
				className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-300 via-pink-500 to-pink-300 transition-transform duration-300 ease-out ${
					isHovered ? 'scale-x-100' : 'scale-x-0'
				}`}
				style={{ transformOrigin: 'left' }}
			/>
		</article>
	)
}
