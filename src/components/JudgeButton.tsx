import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import type { JudgeButtonProps } from '@/types/index'
import { Sparkles } from 'lucide-react'
import type React from 'react'

export const JudgeButton: React.FC<JudgeButtonProps> = ({
	isGenerating,
	isVisible,
	onGenerateArticle,
	onClose,
}) => {
	if (!isVisible) return null

	return (
		<Dialog open={isVisible} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="bg-white/90 backdrop-blur-md border-pink-100 rounded-xl shadow-xl max-w-md">
				<DialogClose />

				<DialogHeader>
					<DialogTitle className="text-2xl font-bold text-pink-800 font-japanese text-center">
						記事を生成しますか？
					</DialogTitle>
					<DialogDescription className="text-center text-pink-600/80">
						会話の内容をもとに夢についての記事を生成します
					</DialogDescription>
				</DialogHeader>

				<div className="flex justify-center py-4">
					<div className="relative w-16 h-16 flex items-center justify-center">
						<div className="absolute inset-0 bg-pink-200 rounded-full animate-ping opacity-50" />
						<Sparkles className="w-8 h-8 text-pink-600 relative" />
					</div>
				</div>

				<DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-center pt-2">
					<Button
						onClick={onGenerateArticle}
						className="bg-gradient-to-br from-pink-500 to-pink-600 
                       text-white shadow-lg hover:from-pink-600 hover:to-pink-700 
                       transition-all duration-300 px-6 py-5 rounded-full"
						disabled={isGenerating}
					>
						<Sparkles className="w-5 h-5 mr-2" />
						記事を生成する
					</Button>

					<Button
						variant="outline"
						className="border-pink-200 text-pink-700 hover:bg-pink-50 rounded-full"
						onClick={onClose}
					>
						キャンセル
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
