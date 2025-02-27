import { useCallback, useEffect, useRef, useState } from 'react'

export const useChat = () => {
	const [messages, setMessages] = useState<
		{ id: string; content: string; role: 'user' | 'assistant' }[]
	>([])
	const [input, setInput] = useState('')
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

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
	useEffect(() => {
		if (messages.length > 0) {
			messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
		}
	}, [messages, messagesEndRef])

	return {
		messages,
		input,
		handleInputChange,
		containerRef,
		messagesEndRef,
		onSubmit,
		isSubmitting,
	}
}
