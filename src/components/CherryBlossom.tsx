import { useCherryBlossom } from '@/hooks/useCherryBlossom'
import { useSVGLoader } from '@/hooks/useSvgLoader'
import '@/styles/CherryBlossom.css'

/**
 * 桜の花びらアニメーションを表示するコンポーネント
 */
export const CherryBlossom: React.FC = () => {
	const { loaded } = useCherryBlossom()
	const { svgContent } = useSVGLoader('/src/assets/cherry-blossom-tree.svg')

	return (
		<div className="fixed inset-0 w-full h-full pointer-events-none">
			<div
				className={`transition-opacity duration-1000 ${loaded ? 'opacity-20' : 'opacity-0'}`}
				dangerouslySetInnerHTML={{ __html: svgContent }}
			/>
		</div>
	)
}

export default CherryBlossom
