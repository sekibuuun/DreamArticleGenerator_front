import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useArticlePreview } from '@/hooks/useAritclePreview'
import type { ArticlePreviewProps } from '@/types'
import { User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const ArticlePreview = ({
	isOpen,
	onClose,
	articleResponse,
}: ArticlePreviewProps) => {
	const isLoading = !articleResponse && isOpen
	const { author, handleAuthorChange, isSubmitting, handleSubmit } =
		useArticlePreview({ onClose, articleResponse })

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

									{/* ニックネーム入力フォーム */}
									<div className="mt-4 mb-2">
										<div className="flex items-center gap-3 mb-2">
											<User className="h-5 w-5 text-pink-500" />
											<Label
												htmlFor="author"
												className="text-pink-700 font-medium"
											>
												ニックネーム
											</Label>
										</div>
										<div className="relative">
											<Input
												id="author"
												type="text"
												value={author}
												onChange={handleAuthorChange}
												placeholder="あなたのニックネームを入力してください"
												className="bg-white/80 border-pink-200 focus:border-pink-400 focus:ring-pink-400 pl-3 pr-3 py-2 rounded-md w-full max-w-md"
											/>
										</div>
										<p className="text-xs text-pink-500/70 mt-1">
											※ ニックネームを入力すると、記事に表示されます
										</p>
									</div>
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
										キャンセル
									</Button>

									<Button
										onClick={handleSubmit}
										disabled={isSubmitting}
										className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-2 rounded-md shadow-md"
									>
										{isSubmitting ? '保存中...' : '記事を保存する'}
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
