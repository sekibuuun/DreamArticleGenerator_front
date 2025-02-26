import type React from 'react'
import { useEffect, useState } from 'react'

interface AnimatedPetalsProps {
	count?: number
	density?: 'low' | 'medium' | 'high'
}

export const AnimatedPetals: React.FC<AnimatedPetalsProps> = ({
	count = 50,
	density = 'medium',
}) => {
	const [petals, setPetals] = useState<
		Array<{
			id: number
			x: number
			y: number
			size: number
			rotation: number
			speed: number
			delay: number
			opacity: number
			pinkness: number
			driftAmplitude: number
			driftSpeed: number
		}>
	>([])

	useEffect(() => {
		// 密度に応じてパラメータを調整
		let sizeMultiplier = 1
		let speedMultiplier = 1

		switch (density) {
			case 'low':
				sizeMultiplier = 1.5
				speedMultiplier = 0.8
				break
			case 'high':
				sizeMultiplier = 0.7
				speedMultiplier = 1.2
				break
			default:
				sizeMultiplier = 1
				speedMultiplier = 1
		}

		// 花びらを生成
		const newPetals = Array.from({ length: count }, (_, i) => ({
			id: i,
			x: Math.random() * 100, // 画面幅に対する割合（%）
			y: -10 - Math.random() * 100, // 画面外から開始
			size: (8 + Math.random() * 15) * sizeMultiplier,
			rotation: Math.random() * 360,
			speed: (1 + Math.random() * 2) * speedMultiplier,
			delay: Math.random() * 10,
			opacity: 0.6 + Math.random() * 0.4,
			pinkness: Math.random(), // ピンク色の強さ（バリエーション用）
			driftAmplitude: 20 + Math.random() * 40, // 横揺れの大きさ
			driftSpeed: 2 + Math.random() * 4, // 横揺れの速さ
		}))

		setPetals(newPetals)
	}, [count, density])

	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
			<style>
				{`
        @keyframes fall-petal {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: var(--petal-opacity, 0.7);
          }
          10% {
            opacity: var(--petal-opacity, 0.7);
          }
          80% {
            opacity: var(--petal-opacity, 0.7);
          }
          100% {
            transform: translateY(110vh) rotate(var(--final-rotation, 360deg));
            opacity: 0;
          }
        }
        
        @keyframes sway-petal {
          0% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(var(--drift-amount, 30px));
          }
          100% {
            transform: translateX(0px);
          }
        }
        
        .falling-petal {
          position: absolute;
          top: 0;
          will-change: transform;
          backface-visibility: hidden;
          background-repeat: no-repeat;
          background-position: center;
          filter: drop-shadow(0 2px 3px rgba(252, 165, 165, 0.2));
        }
        
        .falling-petal::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%);
          opacity: 0.6;
          mix-blend-mode: overlay;
        }
        `}
			</style>

			{petals.map((petal) => {
				// 花びらの形状 - ランダムなバリエーション
				const petalShape = Math.floor(Math.random() * 3)

				// 花びらの色 - ピンクの濃さを変える
				const baseHue = 350 + Math.random() * 10 // 赤〜ピンク
				const saturation = 80 + Math.random() * 20
				const lightness = 80 + Math.random() * 10

				// 花びらの形と色に応じてSVGを生成
				let petalSvg: string

				switch (petalShape) {
					case 0:
						// 丸みのある花びら
						petalSvg = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <path d="M15,2 C18,5 23,6 26,4 C27,13 23,20 15,28 C7,20 3,13 4,4 C7,6 12,5 15,2 Z" 
                  fill="hsl(${baseHue}, ${saturation}%, ${lightness}%)" 
                  stroke="hsl(${baseHue}, ${saturation - 10}%, ${lightness - 10}%)"
                  stroke-width="0.5"
                />
              </svg>
            `
						break
					case 1:
						// ハート型に近い花びら
						petalSvg = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <path d="M15,5 C17,2 22,1 25,3 C28,5 28,12 15,28 C2,12 2,5 5,3 C8,1 13,2 15,5 Z" 
                  fill="hsl(${baseHue}, ${saturation}%, ${lightness}%)" 
                  stroke="hsl(${baseHue}, ${saturation - 10}%, ${lightness - 10}%)"
                  stroke-width="0.5"
                />
              </svg>
            `
						break
					default:
						// 細長い花びら
						petalSvg = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <path d="M15,2 C18,6 21,7 25,7 C23,15 19,21 15,28 C11,21 7,15 5,7 C9,7 12,6 15,2 Z" 
                  fill="hsl(${baseHue}, ${saturation}%, ${lightness}%)" 
                  stroke="hsl(${baseHue}, ${saturation - 10}%, ${lightness - 10}%)"
                  stroke-width="0.5"
                />
              </svg>
            `
				}

				// SVGをbase64エンコード
				const svgBase64 = btoa(petalSvg)

				// 最終回転角度を計算
				const finalRotation = 180 + Math.random() * 360

				return (
					<div
						key={petal.id}
						className="falling-petal"
						style={
							{
								left: `${petal.x}%`,
								top: `${petal.y}%`,
								width: `${petal.size}px`,
								height: `${petal.size}px`,
								backgroundImage: `url("data:image/svg+xml;base64,${svgBase64}")`,
								opacity: petal.opacity,
								transform: `rotate(${petal.rotation}deg)`,
								animation: `
                fall-petal ${30 / petal.speed}s linear ${petal.delay}s infinite,
                sway-petal ${petal.driftSpeed}s ease-in-out ${petal.delay}s infinite alternate
              `,
								animationFillMode: 'forwards',
								'--petal-opacity': petal.opacity.toString(),
								'--final-rotation': `${finalRotation}deg`,
								'--drift-amount': `${petal.driftAmplitude}px`,
							} as React.CSSProperties
						}
					/>
				)
			})}

			{/* 光の粒子効果 - 桜舞う雰囲気を強調 */}
			{Array.from({ length: 20 }).map((_, i) => {
				const size = 2 + Math.random() * 3
				const x = Math.random() * 100
				const y = Math.random() * 100
				const delay = Math.random() * 5
				const duration = 3 + Math.random() * 5

				return (
					<div
						key={`sparkle-${i}`}
						className="absolute rounded-full bg-white mix-blend-screen"
						style={{
							left: `${x}%`,
							top: `${y}%`,
							width: `${size}px`,
							height: `${size}px`,
							opacity: 0.3 + Math.random() * 0.4,
							boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.8)',
							animation: `pulse ${duration}s ease-in-out ${delay}s infinite alternate`,
						}}
					/>
				)
			})}
		</div>
	)
}
