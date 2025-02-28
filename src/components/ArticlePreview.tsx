import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { ArticlePreviewProps } from '@/types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const ArticlePreview = ({
	isOpen,
	onClose,
	articleResponse,
}: ArticlePreviewProps) => {
	const isLoading = !articleResponse && isOpen

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm overflow-y-auto">
			<div className="min-h-screen flex items-center justify-center py-12 px-4">
				<div className="container mx-auto max-w-4xl relative">
					<Card className="bg-white/95 backdrop-blur-md border-pink-50 shadow-lg rounded-xl overflow-hidden relative">
						{isLoading ? (
							<div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
								<div className="w-12 h-12 rounded-full border-4 border-t-pink-500 border-pink-200 animate-spin mb-4" />
								<p className="text-pink-800 font-medium">夢の記事を生成中...</p>
							</div>
						) : articleResponse ? (
							<>
								{/* ヘッダー */}
								<div className="p-6 md:p-8 border-b border-pink-100">
									<h1 className="text-3xl md:text-4xl font-bold text-pink-800 font-japanese mb-4">
										{articleResponse.title}
									</h1>
								</div>

								{/* 記事内容 */}
								<CardContent className="p-6 md:p-8">
									{/* Markdown コンテンツ */}
									<div className="prose prose-pink max-w-none">
										<ReactMarkdown
											remarkPlugins={[remarkGfm]}
											components={{
												h2: ({ ...props }) => (
													<h2
														className="text-2xl font-bold text-pink-700 mt-6 mb-4 border-b pb-2"
														{...props}
													/>
												),
												h3: ({ ...props }) => (
													<h3
														className="text-xl font-semibold text-pink-600 mt-4 mb-3"
														{...props}
													/>
												),
												p: ({ ...props }) => (
													<p
														className="mb-4 text-gray-700 leading-relaxed"
														{...props}
													/>
												),
											}}
										>
											{articleResponse.content}
										</ReactMarkdown>
									</div>
								</CardContent>

								{/* フッター: アクションボタン */}
								<div className="flex justify-between items-center p-4 md:p-6 border-t border-pink-100">
									<Button
										variant="ghost"
										size="sm"
										className="text-pink-600 hover:bg-pink-50"
										onClick={onClose}
									>
										記事一覧に戻る
									</Button>
								</div>
							</>
						) : (
							<div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
								<p className="text-pink-800 font-medium mb-2">
									記事の生成に失敗しました
								</p>
								<p className="text-pink-600/60 text-sm mb-6">
									もう一度お試しください
								</p>
								<Button
									variant="outline"
									className="text-pink-600 border-pink-200 hover:bg-pink-50"
									onClick={onClose}
								>
									記事一覧に戻る
								</Button>
							</div>
						)}
					</Card>
				</div>
			</div>
		</div>
	)
}
