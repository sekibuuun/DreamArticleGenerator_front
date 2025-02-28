import type { ArticlePreviewProps } from '@/types'
import { useState } from 'react'

export const useArticlePreview = ({
	onClose,
	articleResponse,
}: ArticlePreviewProps) => {
	const [author, setAuthor] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAuthor(e.target.value)
	}

	const handleSubmit = async () => {
		if (!articleResponse) return

		setIsSubmitting(true)
		try {
			const response = await fetch('http://127.0.0.1:5000/api/articles', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: articleResponse.title,
					content: articleResponse.content,
					author,
				}),
			})

			if (!response.ok) {
				throw new Error('記事の保存に失敗しました')
			}
			// 成功したら閉じる
			onClose()
		} catch (error) {
			console.error('記事の保存に失敗しました', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return {
		author,
		handleAuthorChange,
		isSubmitting,
		handleSubmit,
	}
}
