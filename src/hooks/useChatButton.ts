import { useState } from 'react'

export const useChatButton = () => {
	const [isHovered, setIsHovered] = useState(false)

	return { isHovered, setIsHovered }
}
