import type React from 'react'

type CherryBlossomProps = {
	className?: string
}

export const CherryBlossom: React.FC<CherryBlossomProps> = ({
	className = '',
}) => {
	return (
		<div
			className={`fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden ${className}`}
		>
			<img
				src="/src/assets/CherryBlossom.svg"
				alt="Cherry Blossom Background"
				className="w-full h-full object-cover opacity-80"
			/>
		</div>
	)
}

export default CherryBlossom
