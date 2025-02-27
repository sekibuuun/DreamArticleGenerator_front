import { useState } from 'react'

export const useArticlePetal = () => {
	const [isHovered, setIsHovered] = useState<boolean>(false)

	return {
		isHovered,
		setIsHovered,
	}
}
