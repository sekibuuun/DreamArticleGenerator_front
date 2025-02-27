import type { PetalDensity } from '@/types/index'

export const animaitionPetalsStyle = (
	density: PetalDensity,
	minDriftAmplitude: number,
	minRotation: number,
) => `
@keyframes fall {
  0% {
    transform: translateY(-5vh) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: ${density === 'low' ? 0.5 : density === 'medium' ? 0.7 : 0.9};
  }
  100% {
    transform: translateY(105vh) translateX(${minDriftAmplitude}px) rotate(${minRotation}deg);
    opacity: 0;
  }
}

@keyframes sway {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(${minDriftAmplitude}px);
  }
  100% {
    transform: translateX(0);
  }
}
`

export const animationAddPetal = () => `
    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `
