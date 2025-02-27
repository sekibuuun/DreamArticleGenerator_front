import React from 'react'

type PetalDensity = 'low' | 'medium' | 'high'

type AnimatedPetalsProps = {
	count: number
	density: PetalDensity
}

type Petal = {
	id: number
	x: number
	y: number
	size: number
	rotation: number
	speed: number
	delay: number
	opacity: number
	driftAmplitude: number
	petalType: number
}

// 定数
const PETAL_CONSTANTS = {
	MIN_SIZE: 5,
	MAX_SIZE: 20,
	MIN_DELAY: 0,
	MAX_DELAY: 5,
	MIN_DURATION: 10,
	MAX_DURATION: 20,
	MIN_ROTATION: 180,
	MAX_ROTATION: 540,
	MIN_DRIFT_AMPLITUDE: 10,
	MAX_DRIFT_AMPLITUDE: 50,
}

// ランダムな値を範囲内で生成するヘルパー関数
const getRandomInRange = (min: number, max: number): number => {
	return min + Math.random() * (max - min)
}

export function AnimatedPetals({
	count,
	density,
}: AnimatedPetalsProps): React.ReactNode {
	// useState と useEffect を直接使用
	const [petals, setPetals] = React.useState<Petal[]>([])

	React.useEffect(() => {
		const newPetals: Petal[] = []

		// Generate random petals
		for (let i = 0; i < count; i++) {
			newPetals.push({
				id: i,
				x: Math.random() * 100, // percentage position
				y: Math.random() * 100,
				size: getRandomInRange(
					PETAL_CONSTANTS.MIN_SIZE,
					PETAL_CONSTANTS.MAX_SIZE,
				),
				rotation: Math.random() * 360, // random rotation
				speed: getRandomInRange(1, 3),
				delay: getRandomInRange(
					PETAL_CONSTANTS.MIN_DELAY,
					PETAL_CONSTANTS.MAX_DELAY,
				),
				opacity: getRandomInRange(0.7, 1),
				driftAmplitude: getRandomInRange(
					PETAL_CONSTANTS.MIN_DRIFT_AMPLITUDE,
					PETAL_CONSTANTS.MAX_DRIFT_AMPLITUDE,
				),
				petalType: Math.floor(Math.random() * 3) + 1, // 1, 2, or 3
			})
		}

		setPetals(newPetals)
	}, [count])

	// 透明度クラスをdensityに基づいて決定
	const getOpacityClass = (baseDensity: PetalDensity): string => {
		switch (baseDensity) {
			case 'low':
				return 'opacity-50'
			case 'medium':
				return 'opacity-70'
			case 'high':
				return 'opacity-90'
			default:
				return 'opacity-70'
		}
	}

	// カスタムアニメーションのためのCSS
	const animationStyles = `
    @keyframes fall {
      0% {
        transform: translateY(-5vh) translateX(0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: ${density === 'low' ? 0.5 : density === 'medium' ? 0.7 : 0.9};
      }
      100% {
        transform: translateY(105vh) translateX(${PETAL_CONSTANTS.MIN_DRIFT_AMPLITUDE}px) rotate(${PETAL_CONSTANTS.MIN_ROTATION}deg);
        opacity: 0;
      }
    }
    
    @keyframes sway {
      0% {
        transform: translateX(0);
      }
      50% {
        transform: translateX(${PETAL_CONSTANTS.MIN_DRIFT_AMPLITUDE}px);
      }
      100% {
        transform: translateX(0);
      }
    }
  `

	React.useEffect(() => {
		// スタイルタグを動的に追加
		const styleTag = document.createElement('style')
		styleTag.innerHTML = animationStyles
		document.head.appendChild(styleTag)

		// クリーンアップ関数
		return () => {
			document.head.removeChild(styleTag)
		}
	}, [animationStyles])

	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden z-1">
			{petals.map((petal: Petal) => {
				const fallDuration = `${
					PETAL_CONSTANTS.MIN_DURATION +
					(PETAL_CONSTANTS.MAX_DURATION - PETAL_CONSTANTS.MIN_DURATION) *
						(1 / petal.speed)
				}s`

				return (
					<div
						key={petal.id}
						className={`absolute bg-no-repeat bg-contain bg-center transform ${getOpacityClass(density)}`}
						style={{
							left: `${petal.x}%`,
							top: `${petal.y}%`,
							width: `${petal.size}px`,
							height: `${petal.size}px`,
							backgroundImage: `url('/src/assets/Petal${petal.petalType}.svg')`,
							opacity: petal.opacity,
							transform: `rotate(${petal.rotation}deg)`,
							animation: `fall ${fallDuration} linear ${petal.delay}s infinite, sway ${petal.speed * 2}s ease-in-out ${petal.delay}s infinite alternate`,
						}}
					/>
				)
			})}
		</div>
	)
}

export type { PetalDensity }
export default AnimatedPetals
