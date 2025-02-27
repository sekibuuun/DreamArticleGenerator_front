import { PETAL_CONSTANTS } from '@/constants'
import { useAnimatePetals } from '@/hooks/useAnimatePetals'
import { getOpacityClass } from '@/lib/utils'
import type { AnimatedPetalsProps, Petal } from '@/types/index'

export const AnimatedPetals = ({ count, density }: AnimatedPetalsProps) => {
	const { petals } = useAnimatePetals({ count, density })

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
