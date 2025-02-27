import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import type React from 'react'

interface JudgeButtonProps {
	isVisible: boolean
	onGenerateArticle: () => void
}

export const JudgeButton: React.FC<JudgeButtonProps> = ({
	isVisible,
	onGenerateArticle,
}) => {
	if (!isVisible) return null

	return (
		<div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
			<Button
				onClick={onGenerateArticle}
				className="
          bg-gradient-to-br from-pink-500 to-pink-600 
          text-white 
          shadow-xl 
          hover:from-pink-600 
          hover:to-pink-700 
          transition-all 
          duration-300 
          animate-bounce
          flex 
          items-center 
          gap-2
          px-6 
          py-3 
          rounded-full"
			>
				<Sparkles className="w-5 h-5 mr-2" />
				記事生成しますか？
			</Button>
		</div>
	)
}
