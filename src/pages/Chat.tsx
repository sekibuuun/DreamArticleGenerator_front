import { SakuraBackground } from '@/components/ui/SakuraBackground'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useChat } from '@/hooks/useChat'
import { cn } from '@/lib/utils'
import { Send } from 'lucide-react'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function Chat() {
	const { messages, input, handleInputChange, handleSubmit } = useChat()
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = useCallback(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [])

	useEffect(() => {
		scrollToBottom()
	}, [scrollToBottom])

	// フォーム送信時の処理
	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!input.trim() || isSubmitting) return

		setIsSubmitting(true)
		try {
			await handleSubmit(e)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="relative min-h-screen bg-gradient-to-b from-pink-50 to-white overflow-hidden">
			<SakuraBackground />

			<div ref={containerRef} className="relative max-w-4xl mx-auto p-4 pt-8">
				{/* ヘッダー */}
				<div className="relative text-center mb-8">
					<div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-200/30 to-transparent h-px" />
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-100/30 to-transparent h-px transform translate-y-1" />
					</div>

					<h1 className="relative inline-block px-8 py-2 bg-gradient-to-b from-white to-transparent">
						<span className="block text-5xl font-bold text-pink-800 font-japanese mb-1">
							夢について発信しよう
						</span>
						<span className="block text-sm tracking-widest text-pink-600/60 uppercase">
							Dream Article Generator
						</span>
					</h1>
				</div>

				{/* チャットカード */}
				<Card className="relative min-h-[70vh] p-6 bg-white/80 backdrop-blur-md border-pink-50 shadow-lg rounded-2xl">
					{/* メッセージエリア */}
					<div className="space-y-6 mb-20">
						{messages.map((m, i) => (
							<div
								key={m.id}
								className={cn(
									'opacity-0 animate-message-in',
									m.role === 'user' ? 'text-right' : 'text-left',
								)}
								style={{
									animationDelay: `${i * 0.1}s`,
								}}
							>
								<div
									className={cn(
										'inline-block max-w-[80%] relative group',
										m.role === 'user' ? 'message-user' : 'message-ai',
									)}
								>
									<div className="absolute -inset-2 bg-gradient-to-r from-pink-100/0 via-pink-100/30 to-pink-100/0 rounded-full blur-md group-hover:via-pink-200/30 transition-all duration-500" />

									<div
										className={cn(
											'relative px-4 py-2 rounded-2xl break-words',
											m.role === 'user'
												? 'bg-gradient-to-br from-pink-400 to-pink-500 text-white'
												: 'bg-white text-gray-800 border border-pink-100',
										)}
									>
										{m.content}
									</div>

									{/* 装飾的な花びら */}
									{m.role === 'assistant' && (
										<div className="absolute -left-3 -top-3 w-6 h-6 opacity-70">
											<svg
												viewBox="0 0 100 100"
												className="w-full h-full text-pink-200 transform rotate-45"
											>
												<path
													d="M50,0 C60,40 90,50 100,50 C90,60 60,90 50,100 C40,90 10,60 0,50 C10,40 40,10 50,0"
													fill="currentColor"
												/>
											</svg>
										</div>
									)}
								</div>
							</div>
						))}
						<div ref={messagesEndRef} />
					</div>

					{/* 入力フォーム */}
					<form
						onSubmit={onSubmit}
						className="absolute bottom-4 left-4 right-4"
					>
						<div className="relative flex gap-2">
							<div className="relative flex-1">
								<div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 via-pink-200/50 to-pink-100/50 rounded-full blur-md" />
								<Input
									value={input}
									onChange={handleInputChange}
									placeholder="桜舞う季節のように、想いを綴ってください..."
									className="relative bg-white/80 border-pink-100 focus:ring-pink-300 rounded-full py-6 px-6 placeholder:text-pink-300"
								/>
							</div>

							<Button
								type="submit"
								size="icon"
								disabled={isSubmitting}
								className={cn(
									'relative rounded-full w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 shadow-lg',
									'after:absolute after:inset-0 after:bg-gradient-to-br after:from-pink-300 after:to-pink-400 after:rounded-full after:blur-md after:-z-10',
									isSubmitting && 'animate-pulse',
								)}
							>
								<Send className="h-5 w-5" />
							</Button>
						</div>
					</form>
				</Card>

				{/* フッター */}
				<footer className="text-center mt-6 mb-4">
					<p className="text-sm text-pink-600/40 font-japanese">
						「春風に舞う花びらのように、心躍る会話を」
					</p>
				</footer>
			</div>
		</div>
	)
}
