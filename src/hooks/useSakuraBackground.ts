import { Petal } from '@/lib/Petal'
import { useEffect, useRef } from 'react'

export const useSakuraBackground = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		// キャンバスをフルスクリーンにリサイズ
		const resizeCanvas = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}
		resizeCanvas()
		window.addEventListener('resize', resizeCanvas)

		let petals: Petal[] = []
		const createPetals = () => {
			petals = Array.from({ length: 50 }, () => new Petal(canvas.width))
		}
		createPetals()

		let animationFrameId: number
		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			for (const petal of petals) {
				petal.update(canvas.width, canvas.height)
				petal.draw(ctx)
			}
			animationFrameId = requestAnimationFrame(animate)
		}
		animate()

		// クリーンアップ
		return () => {
			window.removeEventListener('resize', resizeCanvas)
			cancelAnimationFrame(animationFrameId)
		}
	}, [])

	return { canvasRef }
}
