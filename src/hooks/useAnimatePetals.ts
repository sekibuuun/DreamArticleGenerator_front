import { PETAL_CONSTANTS } from '@/constants'
import { animaitionPetalsStyle } from '@/lib/customAnimation'
import { getRandomInRange } from '@/lib/utils'
import type { AnimatedPetalsProps, Petal } from '@/types/index'
import { useEffect, useState } from 'react'

export const useAnimatePetals = ({ count, density }: AnimatedPetalsProps) => {
	const [petals, setPetals] = useState<Petal[]>([])

	useEffect(() => {
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

	useEffect(() => {
		// スタイルタグを動的に追加
		const styleTag = document.createElement('style')
		styleTag.innerHTML = animaitionPetalsStyle(
			density,
			PETAL_CONSTANTS.MIN_DRIFT_AMPLITUDE,
			PETAL_CONSTANTS.MIN_ROTATION,
		)
		document.head.appendChild(styleTag)
		// クリーンアップ関数
		return () => {
			document.head.removeChild(styleTag)
		}
	}, [
		density,
		PETAL_CONSTANTS.MIN_DRIFT_AMPLITUDE,
		PETAL_CONSTANTS.MIN_ROTATION,
	])

	return { petals }
}
