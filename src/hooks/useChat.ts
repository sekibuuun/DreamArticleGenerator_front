// useChat.ts
import type { Message } from '@/types'
import { useRef, useState } from 'react'

export const useChat = (chatId: number) => {
	const initialMessages: Message[] = [
		{
			id: chatId,
			content: 'こんにちは。あなたの夢はなんですか？',
			role: 'assistant',
		},
	]
	const [messages, setMessages] = useState<Message[]>(initialMessages)
	const [input, setInput] = useState<string>('')
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
	const [showGenerateButton, setShowGenerateButton] = useState<boolean>(false)

	const containerRef = useRef<HTMLDivElement | null>(null)
	const messagesEndRef = useRef<HTMLDivElement | null>(null)

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
				id: chatId,
				role: 'user',
				content: input,
			},
		])
		setInput('')
		setIsSubmitting(true)

		try {
			// Send message to API with the chatId
			const response = await fetch(`http://127.0.0.1:5000/api/chat/${chatId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message: input }),
			})

			if (!response.ok) {
				throw new Error('Failed to send message')
			}

			const data = await response.json()

			// Add AI response to the state
			setMessages((prev) => [
				...prev,
				{
					id: chatId,
					role: 'assistant',
					content: data.response,
				},
			])

			// Check if we should show the generate button (based on your logic)
			setTimeout(() => {
				// The original code that will be executed after 3 seconds
				if (messages.length >= 4) {
					setShowGenerateButton(true)
				}
			}, 3000)
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
				`http://127.0.0.1:5000/api/chat/${chatId}/generate`,
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
