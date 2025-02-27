import { JudgeButton } from '@/components/JudgeButton'
import { MessageBubble } from '@/components/MessageBubble'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useChatContext } from '@/context/ChatContext'
import { useChat } from '@/hooks/useChat'
import { cn, getDelayClass } from '@/lib/utils'
import { Send } from 'lucide-react'

export const Chat = () => {
	const { chatId } = useChatContext()
	const {
		messages,
		input,
		handleInputChange,
		containerRef,
		messagesEndRef,
		onSubmit,
		isSubmitting,
		showGenerateButton,
		handleGenerateArticle,
		handleGenerateAndCloseModal,
	} = useChat(chatId) // Pass the chatId to the hook

	return (
		<div className="relative min-h-screen bg-gradient-to-b from-pink-50 to-white overflow-hidden">
			<div ref={containerRef} className="relative max-w-4xl mx-auto p-4 pt-8">
				{/* ヘッダー */}
				<div className="relative text-center mb-8">
					<div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-200/30 to-transparent h-px" />
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-100/30 to-transparent h-px transform translate-y-1" />
					</div>

					<p className="relative inline-block px-8 py-2 bg-gradient-to-b from-white to-transparent">
						<span className="block text-5xl font-bold text-pink-800 font-japanese mb-1">
							夢について発信しよう
						</span>
						<span className="block text-sm tracking-widest text-pink-600/60 uppercase">
							Dream Article Generator
						</span>
					</p>
				</div>

				{/* チャットカード */}
				<Card className="relative min-h-[70vh] p-6 bg-white/80 backdrop-blur-md border-pink-50 shadow-lg rounded-2xl">
					{/* メッセージエリア - 固定高さとスクロールを追加 */}
					<div
						className="space-y-6 mb-20 overflow-y-auto max-h-[60vh] pr-2 scroll-smooth"
						role="log"
						aria-label="チャットメッセージ"
					>
						{/* 実際のメッセージ表示 */}
						{messages.map((m, i) => (
							<MessageBubble
								key={i}
								message={m.content}
								role={m.role}
								className={cn('animate-message-in', getDelayClass(i))}
							/>
						))}
						{/* スクロール位置をここに設定 */}
						<div ref={messagesEndRef} />
					</div>

					{/* 入力フォーム */}
					<form
						onSubmit={onSubmit}
						className="absolute bottom-4 left-4 right-4"
						aria-label="メッセージ入力フォーム"
					>
						<div className="relative flex gap-2">
							<div className="relative flex-1">
								<div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 via-pink-200/50 to-pink-100/50 rounded-full blur-md" />
								<Input
									value={input}
									onChange={handleInputChange}
									placeholder="桜舞う季節のように、想いを綴ってください..."
									className="relative bg-white/80 border-pink-100 focus:ring-pink-300 rounded-full py-6 px-6 placeholder:text-pink-300"
									aria-label="メッセージを入力"
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
								aria-label="メッセージを送信"
							>
								<Send className="h-5 w-5" aria-hidden="true" />
							</Button>
						</div>
					</form>
				</Card>

				{/* 記事生成ボタン */}
				<JudgeButton
					isVisible={showGenerateButton}
					onGenerateArticle={handleGenerateArticle}
					onClose={handleGenerateAndCloseModal}
				/>
			</div>
		</div>
	)
}
