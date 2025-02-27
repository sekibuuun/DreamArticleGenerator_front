import React from 'react'

type Article = {
	id: number
	title: string
	excerpt: string
	date: string
}

type ArticlePetalProps = {
	article: Article
	index: number
	className?: string
}

// カスタムアニメーションスタイルを追加する関数
const addAnimationStyles = () => {
	const animationStyles = `
    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `

	// 既存のスタイルタグを確認
	const existingStyle = document.getElementById('article-animations')
	if (!existingStyle) {
		const styleTag = document.createElement('style')
		styleTag.id = 'article-animations'
		styleTag.innerHTML = animationStyles
		document.head.appendChild(styleTag)
	}
}

export const ArticlePetal: React.FC<ArticlePetalProps> = ({
	article,
	index,
	className = '',
}) => {
	// アニメーションスタイルを追加
	React.useEffect(() => {
		addAnimationStyles()
	}, [])

	// Format date
	const formatDate = (dateString: string): string => {
		const date = new Date(dateString)
		return date.toLocaleDateString('ja-JP', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	}

	// Staggered animation delay based on index
	const animationDelay = `${index * 0.1}s`

	return (
		<article
			className={`bg-white rounded-lg overflow-hidden shadow-md ${className}`}
			style={{
				animationDelay,
				animation: 'fadeIn 0.5s ease-in-out forwards',
				opacity: 0,
			}}
		>
			<div className="p-4">
				<h2 className="text-xl font-bold text-gray-800 mb-2">
					{article.title}
				</h2>
				<p className="text-gray-600 text-sm mb-4 line-clamp-3">
					{article.excerpt}
				</p>
				<div className="flex flex-wrap text-xs text-gray-500 mb-4">
					<span className="mr-1">{formatDate(article.date)}</span>
				</div>
				<button
					type="button"
					className="text-sm text-pink-600 font-medium hover:text-pink-800 transition-colors"
				>
					続きを読む
				</button>
			</div>
		</article>
	)
}

export type { Article }
export default ArticlePetal
