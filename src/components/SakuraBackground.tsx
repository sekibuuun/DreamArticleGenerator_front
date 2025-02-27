import { useSakuraBackground } from '@/hooks/useSakuraBackground'

export function SakuraBackground() {
	const { canvasRef } = useSakuraBackground()

	return (
		<canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
	)
}
