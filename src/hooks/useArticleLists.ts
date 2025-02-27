import { useState } from 'react'

export const useArticleLists = () => {
	const [isHovered, setIsHovered] = useState<boolean>(false)

	return {
		isHovered,
		setIsHovered,
	}
}
