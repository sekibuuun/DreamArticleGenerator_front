import { useState } from 'react'

export const useChat = () => {
	const [messages, setMessages] = useState<
		{ id: string; content: string; role: 'user' | 'assistant' }[]
	>([])
	const [input, setInput] = useState('')

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!input.trim()) return
		const userMsg: { id: string; content: string; role: 'user' | 'assistant' } =
			{ id: Date.now().toString(), content: input, role: 'user' }
		setMessages((prev) => [...prev, userMsg])
		// 自動応答（簡易実装）
		const aiReply: { id: string; content: string; role: 'user' | 'assistant' } =
			{
				id: (Date.now() + 1).toString(),
				content: '自動応答メッセージ',
				role: 'assistant',
			}
		await new Promise((resolve) => setTimeout(resolve, 500))
		setMessages((prev) => [...prev, aiReply])
		setInput('')
	}

	return { messages, input, handleInputChange, handleSubmit }
}
