// useChat.ts
import { useEffect, useRef, useState } from 'react'

interface Message {
	id: string
	role: 'user' | 'assistant'
	content: string
}

export const useChat = (chatId?: number | null) => {
	const [messages, setMessages] = useState<Message[]>([])
	const [input, setInput] = useState<string>('')
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
	const [showGenerateButton, setShowGenerateButton] = useState<boolean>(false)

	const containerRef = useRef<HTMLDivElement | null>(null)
	const messagesEndRef = useRef<HTMLDivElement | null>(null)

	// You can use the chatId for operations like loading existing messages
	useEffect(() => {
		if (chatId) {
			// Load existing messages for this chat ID
			// This is just an example - implement according to your API
			const loadMessages = async () => {
				try {
					const response = await fetch(
						`http://localhost:5000/api/chat/${chatId}/messages`,
					)
					if (response.ok) {
						const data = await response.json()
						setMessages(data.messages || [])
					}
				} catch (error) {
					console.error('Failed to load messages:', error)
				}
			}

			loadMessages()
		}
	}, [chatId])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value)
	}

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!input.trim() || isSubmitting) return

		// Add user message to the state
		setMessages((prev) => [
			...prev,
			{
				id: Date.now().toString(),
				role: 'assistant' as const, // asを使用して明示的に型を指定
				content: 'test',
			},
		])
		setInput('')
		setIsSubmitting(true)

		try {
			// Send message to API with the chatId
			const response = await fetch(
				`http://localhost:5000/api/chat/${chatId}/send`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ message: input }),
				},
			)

			if (!response.ok) {
				throw new Error('Failed to send message')
			}

			const data = await response.json()

			// Add AI response to the state
			setMessages((prev) => [
				...prev,
				{
					id: Date.now().toString(),
					role: 'assistant',
					content: data.response,
				},
			])

			// Check if we should show the generate button (based on your logic)
			if (messages.length >= 4) {
				setShowGenerateButton(true)
			}
		} catch (error) {
			console.error('Error sending message:', error)
			// Handle error (maybe add an error message to the chat)
		} finally {
			setIsSubmitting(false)
			// Scroll to bottom after new messages
			setTimeout(() => {
				messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
			}, 100)
		}
	}

	const handleGenerateArticle = async () => {
		// Generate article using the chatId
		try {
			const response = await fetch(
				`http://localhost:5000/api/chat/${chatId}/generate`,
				{
					method: 'POST',
				},
			)

			if (!response.ok) {
				throw new Error('Failed to generate article')
			}

			const data = await response.json()

			// Handle the generated article (e.g., redirect to article page)
			window.location.href = `/article/${data.articleId}`
		} catch (error) {
			console.error('Error generating article:', error)
		}
	}

	const handleGenerateAndCloseModal = () => {
		handleGenerateArticle()
		setShowGenerateButton(false)
	}

	return {
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
	}
}
