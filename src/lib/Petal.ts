export class Petal {
	x: number
	y: number
	size: number
	rotation: number
	rotationSpeed: number
	speedX: number
	speedY: number
	opacity: number
	wobble: number
	wobbleSpeed: number

	constructor(canvasWidth: number) {
		this.x = Math.random() * canvasWidth
		this.y = -20
		this.size = Math.random() * 8 + 5 // 5-13px
		this.rotation = Math.random() * 360
		this.rotationSpeed = (Math.random() - 0.5) * 2
		this.speedX = (Math.random() - 0.5) * 2
		this.speedY = Math.random() * 1 + 0.5
		this.opacity = Math.random() * 0.3 + 0.7 // 0.7-1.0
		this.wobble = 0
		this.wobbleSpeed = (Math.random() - 0.5) * 0.05
	}

	update(canvasWidth: number, canvasHeight: number) {
		this.y += this.speedY
		this.x += this.speedX + Math.sin(this.wobble) * 0.5
		this.rotation += this.rotationSpeed
		this.wobble += this.wobbleSpeed

		// 画面外に出たら上に戻す
		if (this.y > canvasHeight + 20) {
			this.y = -20
			this.x = Math.random() * canvasWidth
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.save()
		ctx.translate(this.x, this.y)
		ctx.rotate((this.rotation * Math.PI) / 180)
		ctx.globalAlpha = this.opacity

		const gradient = ctx.createLinearGradient(
			-this.size / 2,
			0,
			this.size / 2,
			0,
		)
		gradient.addColorStop(0, 'rgba(255, 223, 236, 0.8)')
		gradient.addColorStop(0.5, 'rgba(255, 182, 193, 0.8)')
		gradient.addColorStop(1, 'rgba(255, 223, 236, 0.8)')

		ctx.beginPath()
		ctx.moveTo(0, -this.size / 2)
		ctx.quadraticCurveTo(this.size / 2, -this.size / 4, this.size / 2, 0)
		ctx.quadraticCurveTo(this.size / 2, this.size / 4, 0, this.size / 2)
		ctx.quadraticCurveTo(-this.size / 2, this.size / 4, -this.size / 2, 0)
		ctx.quadraticCurveTo(-this.size / 2, -this.size / 4, 0, -this.size / 2)

		ctx.fillStyle = gradient
		ctx.fill()
		ctx.restore()
	}
}
