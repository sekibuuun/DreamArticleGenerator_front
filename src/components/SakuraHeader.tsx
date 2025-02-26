import type React from 'react'
import { useEffect, useRef, useState } from 'react'

export const SakuraHeader: React.FC = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const headerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setIsVisible(true)

		// 桜の花びらを動的に生成してヘッダーに追加
		const createPetals = () => {
			if (!headerRef.current) return

			// 既存の花びらをクリア
			const existingPetals = headerRef.current.querySelectorAll('.header-petal')
			existingPetals.forEach((petal) => petal.remove())

			// 新しい花びらを追加
			const petalCount = 15 // 花びらの数

			for (let i = 0; i < petalCount; i++) {
				const petal = document.createElement('div')
				petal.className =
					'header-petal absolute rounded-full pointer-events-none'

				// ランダムなスタイル
				const size = 5 + Math.random() * 15 // 5px〜20pxのサイズ
				const left = Math.random() * 100
				const top = Math.random() * 100
				const rotation = Math.random() * 360
				const delay = Math.random() * 2
				const duration = 3 + Math.random() * 4

				petal.style.width = `${size}px`
				petal.style.height = `${size}px`
				petal.style.left = `${left}%`
				petal.style.top = `${top}%`
				petal.style.backgroundColor = '#fecdd3'
				petal.style.opacity = `${0.2 + Math.random() * 0.5}`
				petal.style.transform = `rotate(${rotation}deg)`
				petal.style.animation = `floatPetal ${duration}s ease-in-out ${delay}s infinite alternate`

				headerRef.current.appendChild(petal)
			}
		}

		createPetals()

		// ウィンドウリサイズ時に花びらを再生成
		window.addEventListener('resize', createPetals)

		return () => {
			window.removeEventListener('resize', createPetals)
		}
	}, [])

	return (
		<header
			ref={headerRef}
			className="mb-16 text-center relative overflow-hidden"
		>
			{/* 花びらアニメーション用のスタイル */}
			<style>
				{`
          @keyframes floatPetal {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(-20px) rotate(360deg); }
          }
          
          .fade-in-up {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 1s forwards;
          }
          
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .header-title {
            background: linear-gradient(120deg, #f9a8d4 0%, #be185d 50%, #9d174d 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: shimmer 3s infinite;
            background-size: 200% 200%;
          }
          
          @keyframes shimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .border-shine {
            position: relative;
            overflow: hidden;
          }
          
          .border-shine::after {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.3) 50%,
              rgba(255, 255, 255, 0) 100%
            );
            animation: shine 3s infinite;
          }
          
          @keyframes shine {
            100% { left: 150%; }
          }
        `}
			</style>

			{/* デコレーティブな背景要素 */}
			<div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
			<div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-pink-200 to-transparent opacity-40" />
			<div className="absolute right-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-pink-200 to-transparent opacity-40" />

			{/* メインヘッダー内容 */}
			<div
				className={`relative inline-block px-10 py-6 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-sm border border-pink-100 border-shine transition-all duration-1000 ${
					isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
				}`}
			>
				<h1 className="relative">
					<span
						className="block absolute -top-6 left-1/2 transform -translate-x-1/2 text-pink-400 text-lg font-medium tracking-widest fade-in-up"
						style={{ animationDelay: '0.2s' }}
					>
						Spring Stories
					</span>
					<span
						className="header-title block text-4xl md:text-5xl font-bold text-transparent bg-clip-text fade-in-up"
						style={{ animationDelay: '0.4s' }}
					>
						Dream Article
					</span>
					<span
						className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-300 via-pink-500 to-pink-300 rounded-full fade-in-up"
						style={{ animationDelay: '0.6s' }}
					/>
				</h1>

				{/* 桜のアイコン装飾 */}
				<div
					className="absolute -top-5 -right-5 w-10 h-10 text-pink-300 transform rotate-15 fade-in-up"
					style={{ animationDelay: '0.7s' }}
				>
					<svg viewBox="0 0 24 24" fill="currentColor">
						<path d="M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5 s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5S13.38,11.5,12,11.5z" />
					</svg>
				</div>
				<div
					className="absolute -bottom-3 -left-3 w-8 h-8 text-pink-200 transform -rotate-10 fade-in-up"
					style={{ animationDelay: '0.8s' }}
				>
					<svg viewBox="0 0 24 24" fill="currentColor">
						<path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M11,9.93v4.14c0,0.55,0.45,1,1,1s1-0.45,1-1V9.93c0.61-0.35,1-0.99,1-1.72c0-1.1-0.9-2-2-2s-2,0.9-2,2C10,8.94,10.39,9.58,11,9.93z" />
					</svg>
				</div>
			</div>

			{/* 季節のお知らせ */}
			<div
				className={`mt-8 max-w-lg mx-auto bg-white bg-opacity-70 backdrop-blur-sm p-5 rounded-lg shadow-sm border border-pink-100 transition-all duration-1000 ${
					isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
				}`}
				style={{ transitionDelay: '0.3s' }}
			>
				<div className="flex items-center">
					<div className="flex-shrink-0 mr-3">
						<div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
								/>
							</svg>
						</div>
					</div>
					<div className="flex-1">
						<p className="text-gray-700 font-medium">
							<span className="text-pink-600 font-semibold">2024年桜前線</span>
							：東京の桜は満開です。各地の開花情報と共にお楽しみください。
						</p>
					</div>
				</div>
			</div>
		</header>
	)
}
