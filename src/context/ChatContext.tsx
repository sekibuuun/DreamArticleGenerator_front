// src/context/ChatContext.tsx
import type { ChatContextType } from '@/types'
import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider = ({ children }: { children: ReactNode }) => {
	const [chatId, setChatId] = useState<number | null>(null)

	return (
		<ChatContext.Provider value={{ chatId, setChatId }}>
			{children}
		</ChatContext.Provider>
	)
}

export const useChatContext = (): ChatContextType => {
	const context = useContext(ChatContext)
	if (context === undefined) {
		throw new Error('useChatContext must be used within a ChatProvider')
	}
	return context
}
