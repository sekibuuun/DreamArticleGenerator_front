import type { ChatResponse, GenerateArticleResponse, Message } from '@/types'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'

export const useChat = (chatId: number) => {
	const navigate = useNavigate()
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
	const [isArticlePreviewOpen, setIsArticlePreviewOpen] =
		useState<boolean>(false)

	const containerRef = useRef<HTMLDivElement | null>(null)
	const messagesEndRef = useRef<HTMLDivElement | null>(null)

	const [articleResponse, setArticleResponse] =
		useState<GenerateArticleResponse | null>(null)

	const waitTime: number = 2000

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

			const data: ChatResponse = await response.json()

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
			}, waitTime)
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
		try {
			const response = await fetch(
				`http://127.0.0.1:5000/api/article/generate/${chatId}`,
				{
					method: 'GET',
				},
			)

			if (!response.ok) {
				throw new Error('Failed to generate article')
			}

			const data: GenerateArticleResponse = await response.json()

			console.log('Generated article:', data)
			setShowGenerateButton(false)
			setIsArticlePreviewOpen(true)
			setArticleResponse(data)
			return data
		} catch (error) {
			console.error('Error generating article:', error)
		}
	}

	const handleGenerateAndCloseModal = () => {
		handleGenerateArticle()
		setShowGenerateButton(false)
	}

	const handleCloseArticleModal = () => {
		setIsArticlePreviewOpen(false)
		navigate('/')
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
		isArticlePreviewOpen,
		handleCloseArticleModal,
		articleResponse,
	}
}
