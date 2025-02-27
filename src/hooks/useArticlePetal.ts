import { animationAddPetal } from '@/lib/customAnimation'
import { useEffect } from 'react'

export const useArticlePetal = () => {
	useEffect(() => {
		const AddPetal = () => {
			const existingStyle = document.getElementById('article-animations')
			if (!existingStyle) {
				const styleTag = document.createElement('style')
				styleTag.id = 'article-animations'
				styleTag.innerHTML = animationAddPetal()
				document.head.appendChild(styleTag)
			}
		}
		AddPetal()
	}, [])
}
