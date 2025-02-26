import type React from 'react'
import { useState } from 'react'

interface Article {
	id: number
	title: string
	excerpt: string
	date: string
	author: string
	readTime: string
}

interface SakuraArticleProps {
	article: Article
	index: number
	className?: string
}

export const SakuraArticle: React.FC<SakuraArticleProps> = ({
	article,
	index,
	className,
}) => {
	// ホバー状態の管理
	const [isHovered, setIsHovered] = useState(false)

	// 奇数/偶数のインデックスに応じて花びらの色を変える
	const petalColors = [
		{ bg: 'from-white to-pink-50', border: 'border-pink-100' },
		{ bg: 'from-white to-pink-100', border: 'border-pink-200' },
		{ bg: 'from-white to-rose-50', border: 'border-pink-100' },
		{ bg: 'from-white to-pink-50', border: 'border-rose-100' },
		{ bg: 'from-white to-pink-200', border: 'border-pink-300' },
	]

	const colorSet = petalColors[index % petalColors.length]

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
        relative transition-all duration-500 ease-in-out
        ${className || ''}
      `}
			style={{
				opacity: 1,
				transition: 'transform 0.3s ease, box-shadow 0.3s ease',
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* 桜型の形状 - clipPath で花びらの形を作る */}
			<div
				className={`
          relative rounded-lg overflow-hidden
          bg-gradient-to-br ${colorSet.bg}
          border ${colorSet.border}
          p-6 h-full
          shadow-sm
          transform transition-all duration-500
          ${isHovered ? 'shadow-md -translate-y-1' : ''}
        `}
				style={{
					clipPath:
						'polygon(50% 0%, 65% 15%, 85% 15%, 85% 35%, 100% 50%, 85% 65%, 85% 85%, 65% 85%, 50% 100%, 35% 85%, 15% 85%, 15% 65%, 0% 50%, 15% 35%, 15% 15%, 35% 15%)',
					minHeight: '280px',
				}}
			>
				<div className="flex flex-col h-full justify-between">
					{/* 記事タイトル */}
					<h2 className="text-xl font-bold text-gray-800 mb-3 group text-center pt-3">
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
					<p className="text-gray-600 mb-4 text-sm line-clamp-3 flex-grow">
						{article.excerpt}
					</p>

					{/* 記事のメタ情報 */}
					<div className="flex justify-between items-center text-xs">
						<div className="flex items-center">
							<svg
								className="w-3 h-3 mr-1 text-pink-400"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
								<circle cx="12" cy="7" r="4" />
							</svg>
							<span className="text-gray-500">{article.author}</span>
						</div>

						<div className="flex items-center">
							<svg
								className="w-3 h-3 mr-1 text-pink-400"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							>
								<circle cx="12" cy="12" r="10" />
								<polyline points="12 6 12 12 16 14" />
							</svg>
							<span className="text-gray-500">{article.readTime}読了</span>
						</div>
					</div>

					<div className="mt-3 text-center">
						<time dateTime={article.date} className="text-xs text-gray-500">
							{formatDate(article.date)}
						</time>
					</div>

					{/* 続きを読むボタン - ホバー時に表示 */}
					<div
						className={`
              absolute bottom-5 left-0 right-0 text-center
              transition-opacity duration-300 ease-in-out
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}
					>
						<span className="text-pink-600 text-sm font-medium inline-flex items-center">
							続きを読む
							<svg
								className="w-4 h-4 ml-1"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</span>
					</div>
				</div>
			</div>

			{/* 桜の茎 - ホバー時に表示 */}
			<div
				className={`
          absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1 bg-green-300
          transition-all duration-500 ease-in-out
          ${isHovered ? 'h-4 opacity-100' : 'h-0 opacity-0'}
        `}
			/>
		</article>
	)
}
