import { useArticleLists } from '@/hooks/useArticleLists'
import { formatDate } from '@/lib/utils'
import type { ArticleListsProps } from '@/types/index'

export const ArticleLists = ({ id, article, index }: ArticleListsProps) => {
	const { isHovered, setIsHovered } = useArticleLists()
	const delayClass = `delay-${index * 100}`

	return (
		<div
			id={String(id)}
			className={`relative bg-white rounded-lg overflow-hidden shadow-md animate-fadeIn transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ${delayClass}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
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

			{/* コンポーネントの下部に表示される下線 */}
			<div
				className={`
          absolute bottom-0 left-0 right-0 h-1 bg-pink-500
          transition-transform duration-300 ease-in-out origin-left
          ${isHovered ? 'scale-x-100' : 'scale-x-0'}
        `}
			/>
		</div>
	)
}
