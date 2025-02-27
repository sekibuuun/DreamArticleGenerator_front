import { useCallback, useEffect, useRef, useState } from 'react'

export const useChat = () => {
	const [messages, setMessages] = useState<
		{ id: string; content: string; role: 'user' | 'assistant' }[]
	>([
		// 初期メッセージを追加
		{
			id: '1',
			content: 'アナウンス',
			role: 'assistant',
		},
	])
	const [input, setInput] = useState('')
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const [showGenerateButton, setShowGenerateButton] = useState(false)
	const userMessageCountRef = useRef(0)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!input.trim()) return

		const userMsg = {
			id: Date.now().toString(),
			content: input,
			role: 'user' as const,
		}

		setMessages((prevMessages) => {
			const updatedMessages = [...prevMessages, userMsg]
			userMessageCountRef.current += 1

			console.log('User Message Count:', userMessageCountRef.current)

			if (userMessageCountRef.current >= 6) {
				console.log('Showing generate button')
				setShowGenerateButton(true)
			}

			return updatedMessages
		})

		const aiReply = {
			id: (Date.now() + 1).toString(),
			content: '自動メッセージ',
			role: 'assistant' as const,
		}

		await new Promise((resolve) => setTimeout(resolve, 500))

		setMessages((prevMessages) => [...prevMessages, aiReply])

		setInput('')
	}

	const scrollToBottom = useCallback(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [])

	useEffect(() => {
		scrollToBottom()
	}, [messages, scrollToBottom])

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

	const handleGenerateArticle = () => {
		console.log('記事生成ボタンがクリックされました')
		setShowGenerateButton(false)
	}

	const handleGenerateAndCloseModal = () => {
		handleGenerateArticle()
		setIsModalOpen(false)
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
		isModalOpen,
	}
}
