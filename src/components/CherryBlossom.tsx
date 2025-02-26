import type React from 'react'
import { useEffect, useState } from 'react'

interface CherryBlossomProps {
	className?: string
}

export const CherryBlossom: React.FC<CherryBlossomProps> = ({ className }) => {
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		// アニメーションのためにコンポーネントが読み込まれたことを示す
		setLoaded(true)

		// 風の効果をシミュレートする - ランダムな間隔で木を少し揺らす
		const treeElements = document.querySelectorAll('.tree-part')
		let animationActive = true

		const animateTrees = () => {
			if (!animationActive) return

			treeElements.forEach((tree) => {
				const element = tree as HTMLElement
				// ランダムな揺れの強さ
				const intensity = 0.2 + Math.random() * 0.8
				// ランダムな方向
				const direction = Math.random() > 0.5 ? 1 : -1
				// 揺れの持続時間
				const duration = 4 + Math.random() * 6

				element.style.animation = `sway-tree ${duration}s ease-in-out`
				element.style.transform = `rotate(${direction * intensity}deg)`

				// アニメーション終了時にリセット
				setTimeout(() => {
					if (animationActive) {
						element.style.animation = ''
						element.style.transform = ''
					}
				}, duration * 1000)
			})

			// 次の風の効果までの時間
			const nextWind = 5000 + Math.random() * 10000
			setTimeout(animateTrees, nextWind)
		}

		// 初期アニメーション開始（少し遅延を入れる）
		setTimeout(animateTrees, 2000)

		return () => {
			animationActive = false
		}
	}, [])

	return (
		<>
			<style>
				{`
        @keyframes sway-tree {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(var(--sway-angle, 0.5deg)); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(calc(var(--sway-angle, 0.5deg) * -0.7)); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes flutter {
          0% { transform: rotate(0deg) translateY(0); }
          33% { transform: rotate(10deg) translateY(-5px); }
          66% { transform: rotate(-8deg) translateY(5px); }
          100% { transform: rotate(0deg) translateY(0); }
        }
        
        @keyframes fall-realistic {
          0% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.9;
          }
          50% {
            transform: translateY(50vh) rotate(180deg);
            opacity: 0.9;
          }
          100% { 
            transform: translateY(100vh) rotate(360deg); 
            opacity: 0;
          }
        }
        
        @keyframes drift {
          0% { transform: translateX(0); }
          50% { transform: translateX(20px); }
          100% { transform: translateX(0); }
        }
        `}
			</style>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1200 1000"
				className={`transition-opacity duration-1000 ${loaded ? 'opacity-20' : 'opacity-0'} ${className || ''}`}
				aria-hidden="true"
				preserveAspectRatio="xMidYMid slice"
			>
				<defs>
					{/* メインの桜のグラデーション */}
					<radialGradient
						id="cherry-gradient-1"
						cx="50%"
						cy="50%"
						r="50%"
						fx="40%"
						fy="40%"
					>
						<stop offset="0%" stopColor="#FECDD3" stopOpacity="0.9" />
						<stop offset="40%" stopColor="#FBCFE8" stopOpacity="0.7" />
						<stop offset="70%" stopColor="#FCE7F3" stopOpacity="0.5" />
						<stop offset="100%" stopColor="#FDF2F8" stopOpacity="0" />
					</radialGradient>

					{/* 中心部の桜の色 */}
					<radialGradient
						id="cherry-center"
						cx="50%"
						cy="50%"
						r="50%"
						fx="50%"
						fy="50%"
					>
						<stop offset="0%" stopColor="#FCA5A5" />
						<stop offset="30%" stopColor="#FECACA" />
						<stop offset="100%" stopColor="#FEE2E2" />
					</radialGradient>

					{/* 木の幹のテクスチャ */}
					<linearGradient id="trunk-texture" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#8B4513" />
						<stop offset="20%" stopColor="#A0522D" />
						<stop offset="40%" stopColor="#8B4513" />
						<stop offset="60%" stopColor="#964B00" />
						<stop offset="80%" stopColor="#8B4513" />
						<stop offset="100%" stopColor="#A0522D" />
					</linearGradient>

					{/* 木の枝のテクスチャ */}
					<linearGradient id="branch-texture" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#A0522D" />
						<stop offset="30%" stopColor="#8B4513" />
						<stop offset="70%" stopColor="#A0522D" />
						<stop offset="100%" stopColor="#8B4513" />
					</linearGradient>

					{/* 桜の花びらのパターン */}
					<pattern
						id="bark-pattern"
						patternUnits="userSpaceOnUse"
						width="50"
						height="50"
					>
						<path
							d="M0,0 L10,10 L0,20 L10,30 L0,40 L10,50 L20,40 L30,50 L40,40 L50,50 L40,30 L50,20 L40,10 L50,0 L40,10 L30,0 L20,10 L10,0 Z"
							fill="#814123"
							opacity="0.3"
						/>
					</pattern>

					{/* 花びらの形状を定義 */}
					<symbol id="petal" viewBox="0 0 24 24">
						<path d="M12,2 C15,5 18,6 21,5 C22,12 20,16 12,22 C4,16 2,12 3,5 C6,6 9,5 12,2 Z" />
					</symbol>

					{/* リアルな花びらの形状 */}
					<symbol id="realistic-petal" viewBox="0 0 30 30">
						<path
							d="M15,2 C18,5 23,6 26,4 C27,13 23,20 15,28 C7,20 3,13 4,4 C7,6 12,5 15,2 Z"
							strokeWidth="0.5"
							stroke="#FECDD3"
						/>
					</symbol>

					{/* 風の効果フィルター */}
					<filter id="wind-filter" x="-20%" y="-20%" width="140%" height="140%">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.01"
							numOctaves="3"
							seed="3"
							result="turbulence"
						/>
						<feDisplacementMap
							in="SourceGraphic"
							in2="turbulence"
							scale="15"
							xChannelSelector="R"
							yChannelSelector="G"
						/>
					</filter>

					{/* 木の質感フィルター */}
					<filter id="trunk-texture-filter">
						<feTurbulence
							type="turbulence"
							baseFrequency="0.05"
							numOctaves="2"
							seed="5"
							result="noise"
						/>
						<feDisplacementMap
							in="SourceGraphic"
							in2="noise"
							scale="2"
							xChannelSelector="R"
							yChannelSelector="G"
						/>
					</filter>
				</defs>

				{/* 空の背景 */}
				<rect width="1200" height="1000" fill="#FDF2F8" opacity="0.5" />

				{/* 桜の木の幹 - メイン */}
				<g
					className="tree-part"
					style={
						{
							transformOrigin: 'center 1000px',
							'--sway-angle': '0.3deg',
						} as React.CSSProperties
					}
				>
					<path
						d="M580,1000 Q570,800 550,700 Q520,600 500,550 Q480,500 450,400 Q420,300 400,200 Q380,100 400,50 Q420,0 450,20 Q480,40 500,100 Q520,160 550,300 Q580,440 600,550 Q620,440 650,300 Q680,160 700,100 Q720,40 750,20 Q780,0 800,50 Q820,100 800,200 Q780,300 750,400 Q720,500 700,550 Q680,600 650,700 Q630,800 620,1000 Z"
						fill="url(#trunk-texture)"
						filter="url(#trunk-texture-filter)"
					/>

					{/* 木の幹の質感 */}
					<path
						d="M580,1000 Q570,800 550,700 Q520,600 500,550 Q480,500 450,400 Q420,300 400,200 Q380,100 400,50 Q420,0 450,20 Q480,40 500,100 Q520,160 550,300 Q580,440 600,550 Q620,440 650,300 Q680,160 700,100 Q720,40 750,20 Q780,0 800,50 Q820,100 800,200 Q780,300 750,400 Q720,500 700,550 Q680,600 650,700 Q630,800 620,1000 Z"
						fill="url(#bark-pattern)"
						opacity="0.4"
					/>
				</g>

				{/* 桜の木の枝 - 左側 */}
				<g
					className="tree-part"
					style={
						{
							transformOrigin: '400px 250px',
							'--sway-angle': '0.8deg',
						} as React.CSSProperties
					}
				>
					<path
						d="M450,250 Q400,200 350,180 Q300,160 250,200 Q200,240 220,280 Q240,320 300,340 Q360,360 450,250 Z"
						fill="url(#branch-texture)"
						filter="url(#trunk-texture-filter)"
					/>

					{/* 左側の小枝1 */}
					<path
						d="M320,210 Q290,190 260,200 Q230,210 210,240 Q200,270 230,290 Q260,310 320,290 Z"
						fill="url(#branch-texture)"
						filter="url(#trunk-texture-filter)"
						opacity="0.9"
					/>

					{/* 左側の小枝2 */}
					<path
						d="M280,270 Q250,260 210,280 Q180,300 190,330 Q210,360 260,350 Q300,340 330,300 Z"
						fill="url(#branch-texture)"
						filter="url(#trunk-texture-filter)"
						opacity="0.9"
					/>

					{/* 樹皮のテクスチャ - 左枝 */}
					<path
						d="M450,250 Q400,200 350,180 Q300,160 250,200 Q200,240 220,280 Q240,320 300,340 Q360,360 450,250 Z"
						fill="url(#bark-pattern)"
						opacity="0.3"
					/>
				</g>

				{/* 桜の木の枝 - 右側 */}
				<g
					className="tree-part"
					style={
						{
							transformOrigin: '750px 250px',
							'--sway-angle': '0.7deg',
						} as React.CSSProperties
					}
				>
					<path
						d="M750,250 Q800,200 850,180 Q900,160 950,200 Q1000,240 980,280 Q960,320 900,340 Q840,360 750,250 Z"
						fill="url(#branch-texture)"
						filter="url(#trunk-texture-filter)"
					/>

					{/* 右側の小枝1 */}
					<path
						d="M880,210 Q910,190 940,200 Q970,220 980,250 Q970,280 940,290 Q890,300 840,270 Z"
						fill="url(#branch-texture)"
						filter="url(#trunk-texture-filter)"
						opacity="0.9"
					/>

					{/* 右側の小枝2 */}
					<path
						d="M920,270 Q950,260 990,280 Q1020,300 1010,330 Q990,360 940,350 Q900,340 870,300 Z"
						fill="url(#branch-texture)"
						filter="url(#trunk-texture-filter)"
						opacity="0.9"
					/>

					{/* 樹皮のテクスチャ - 右枝 */}
					<path
						d="M750,250 Q800,200 850,180 Q900,160 950,200 Q1000,240 980,280 Q960,320 900,340 Q840,360 750,250 Z"
						fill="url(#bark-pattern)"
						opacity="0.3"
					/>
				</g>

				{/* 桜の花の集まり - 左側の枝 */}
				<g
					className="tree-part"
					style={
						{
							transformOrigin: '300px 250px',
							'--sway-angle': '1deg',
						} as React.CSSProperties
					}
				>
					{Array.from({ length: 25 }).map((_, i) => {
						// 左側の枝に配置する花のランダムな位置
						const cx = 250 + Math.random() * 200
						const cy = 180 + Math.random() * 160
						const size = 12 + Math.random() * 12
						const rotation = Math.random() * 360
						const animationDelay = i * 0.2

						return (
							<g
								key={`flower-left-${i}`}
								transform={`translate(${cx}, ${cy}) rotate(${rotation})`}
								style={{
									animation: `flutter ${5 + Math.random() * 5}s ease-in-out ${animationDelay}s infinite`,
									transformOrigin: 'center',
								}}
							>
								{/* 5枚の花びらで1つの花を形成 */}
								{Array.from({ length: 5 }).map((_, j) => {
									const petalRotation = j * 72
									return (
										<use
											key={`petal-left-${i}-${j}`}
											href="#realistic-petal"
											width={size}
											height={size}
											transform={`rotate(${petalRotation}) translate(-${size / 2}, -${size / 2})`}
											fill="#FEE2E2"
											stroke="#FECDD3"
											strokeWidth="0.5"
										/>
									)
								})}
								<circle
									cx="0"
									cy="0"
									r={size * 0.15}
									fill="url(#cherry-center)"
								/>
							</g>
						)
					})}
				</g>

				{/* 桜の花の集まり - 右側の枝 */}
				<g
					className="tree-part"
					style={
						{
							transformOrigin: '900px 250px',
							'--sway-angle': '1deg',
						} as React.CSSProperties
					}
				>
					{Array.from({ length: 25 }).map((_, i) => {
						// 右側の枝に配置する花のランダムな位置
						const cx = 750 + Math.random() * 200
						const cy = 180 + Math.random() * 160
						const size = 12 + Math.random() * 12
						const rotation = Math.random() * 360
						const animationDelay = i * 0.2 + 0.5 // 左右で少しずらす

						return (
							<g
								key={`flower-right-${i}`}
								transform={`translate(${cx}, ${cy}) rotate(${rotation})`}
								style={{
									animation: `flutter ${5 + Math.random() * 5}s ease-in-out ${animationDelay}s infinite`,
									transformOrigin: 'center',
								}}
							>
								{/* 5枚の花びらで1つの花を形成 */}
								{Array.from({ length: 5 }).map((_, j) => {
									const petalRotation = j * 72
									return (
										<use
											key={`petal-right-${i}-${j}`}
											href="#realistic-petal"
											width={size}
											height={size}
											transform={`rotate(${petalRotation}) translate(-${size / 2}, -${size / 2})`}
											fill="#FEE2E2"
											stroke="#FECDD3"
											strokeWidth="0.5"
										/>
									)
								})}
								<circle
									cx="0"
									cy="0"
									r={size * 0.15}
									fill="url(#cherry-center)"
								/>
							</g>
						)
					})}
				</g>

				{/* 散り桜 - 落ちる花びら */}
				{Array.from({ length: 100 }).map((_, i) => {
					const x = Math.random() * 1200
					const y = -50 + Math.random() * 300 // 画面上から少し上の位置から開始
					const size = 5 + Math.random() * 15
					const rotation = Math.random() * 360
					const duration = 15 + Math.random() * 20 // 落下時間
					const delay = Math.random() * 20 // ランダムな開始遅延

					// 横方向の風の効果のためのパラメータ
					const driftDuration = 5 + Math.random() * 10

					return (
						<g
							key={`falling-petal-${i}`}
							style={{
								animation: `fall-realistic ${duration}s linear ${delay}s infinite, drift ${driftDuration}s ease-in-out ${delay}s infinite alternate`,
								transformOrigin: 'center',
								transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
							}}
						>
							<use
								href="#realistic-petal"
								width={size}
								height={size}
								fill="#FECDD3"
								opacity="0.9"
								style={{
									filter: 'drop-shadow(0px 2px 2px rgba(252, 165, 165, 0.3))',
								}}
							/>
						</g>
					)
				})}

				{/* 前景の散る花びら - より大きく鮮明 */}
				{Array.from({ length: 30 }).map((_, i) => {
					const x = Math.random() * 1200
					const y = -50 + Math.random() * 200
					const size = 15 + Math.random() * 20
					const rotation = Math.random() * 360
					const duration = 12 + Math.random() * 15
					const delay = Math.random() * 15

					return (
						<g
							key={`foreground-petal-${i}`}
							style={{
								animation: `fall-realistic ${duration}s linear ${delay}s infinite, drift ${8 + Math.random() * 6}s ease-in-out ${delay}s infinite alternate`,
								transformOrigin: 'center',
								transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
								zIndex: 100,
							}}
						>
							<use
								href="#realistic-petal"
								width={size}
								height={size}
								fill="#FDA4AF"
								stroke="#FECDD3"
								strokeWidth="0.7"
								opacity="0.95"
								style={{
									filter: 'drop-shadow(0px 3px 3px rgba(252, 165, 165, 0.5))',
								}}
							/>
						</g>
					)
				})}
			</svg>
		</>
	)
}
