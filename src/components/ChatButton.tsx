import { useChatContext } from '@/context/ChatContext'
// src/components/ChatButton.tsx
import React from 'react'
import { useNavigate } from 'react-router'

// useChatButton フックの型定義
interface UseChatButtonReturn {
	isHovered: boolean
	setIsHovered: React.Dispatch<React.SetStateAction<boolean>>
}

// APIレスポンスの型定義
interface ChatIdResponse {
	chatId: string
	// 他のAPI返却値がある場合は追加
}

export const ChatButton: React.FC = () => {
	// useChatButton フックの正確な実装に合わせて型を調整してください
	const { isHovered, setIsHovered } = useChatButton() as UseChatButtonReturn
	const { setChatId } = useChatContext()
	const navigate = useNavigate()

	const handleFetchChatId = async (e: React.MouseEvent): Promise<void> => {
		e.preventDefault() // デフォルトのナビゲーションを防止

		try {
			const response = await fetch('http://127.0.0.1:5000/api/chat/get_id')
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			const data = (await response.json()) as ChatIdResponse
			console.log(data)

			// コンテキストにchatIdを保存
			setChatId(Number(data.chatId))

			// プログラムでチャットページに移動
			navigate('/chat')
		} catch (error) {
			console.error('Failed to fetch chat ID:', error)
		}
	}

	return (
		<div
			onClick={handleFetchChatId}
			className="fixed bottom-8 right-8 flex items-center justify-center cursor-pointer"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="relative">
				<div
					className={`
            bg-pink-100 text-pink-800 w-16 h-16 rounded-full shadow-lg
            flex items-center justify-center
            transform transition-all duration-300 ease-in-out
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}
				>
					<span className="text-2xl font-medium">+</span>
				</div>
				<div
					className={`
            absolute -top-1 -right-1 text-pink-400
            transform transition-all duration-300 ease-in-out
            ${isHovered ? 'rotate-45 scale-110' : 'rotate-0 scale-100'}
          `}
				/>
			</div>
			{isHovered && (
				<div className="absolute -top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
					<div className="bg-white px-4 py-2 rounded-lg shadow-md text-sm text-gray-600">
						記事を生成する
					</div>
					<div className="w-3 h-3 bg-white transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
				</div>
			)}
		</div>
	)
}

// useChatButton フックの実装例 (実際の実装に合わせて調整してください)
function useChatButton(): UseChatButtonReturn {
	const [isHovered, setIsHovered] = React.useState<boolean>(false)
	return { isHovered, setIsHovered }
}
