import type React from 'react'
import { useEffect } from 'react'
import { AnimatedPetals } from './components/AnimatedPetals'
import { ArticlePetal } from './components/ArticlePetal'
import { CherryBlossom } from './components/CherryBlossom'

interface Article {
	id: number
	title: string
	excerpt: string
	date: string
	author: string
	readTime: string
	imageUrl?: string
	category: string
}

export default function App(): React.ReactNode {
	// サンプル記事データ
	const articles: Article[] = [
		{
			id: 1,
			title: '春の訪れ',
			excerpt:
				'桜前線と共に北上する春の足音について考察します。日本列島を彩る桜の開花状況と気象条件の関係性から、自然の美しいリズムを探ります。',
			date: '2024-03-01',
			author: '佐藤 花子',
			readTime: '5分',
			imageUrl: 'https://source.unsplash.com/random/600x400/?cherry,blossom',
			category: '自然',
		},
		{
			id: 2,
			title: '花見の歴史',
			excerpt:
				'平安時代から続く日本の伝統行事である花見の歴史を紐解きます。貴族の遊びから庶民の祭りへと変化していった文化的背景を探ります。',
			date: '2024-03-05',
			author: '田中 歴史',
			readTime: '8分',
			imageUrl: 'https://source.unsplash.com/random/600x400/?japan,festival',
			category: '文化',
		},
		{
			id: 3,
			title: '桜餅のレシピ',
			excerpt:
				'家庭で作れる簡単な桜餅の作り方を紹介。関東風と関西風、二種類の製法を解説し、季節の味わいを楽しむコツをお教えします。',
			date: '2024-03-10',
			author: '山本 シェフ',
			readTime: '6分',
			imageUrl: 'https://source.unsplash.com/random/600x400/?japanese,sweets',
			category: '料理',
		},
		{
			id: 4,
			title: '名所案内',
			excerpt:
				'全国の桜の名所をご紹介します。知る人ぞ知る穴場スポットから有名な観光地まで、桜の見頃や特徴、アクセス方法を詳しく解説します。',
			date: '2024-03-15',
			author: '鈴木 旅人',
			readTime: '10分',
			imageUrl: 'https://source.unsplash.com/random/600x400/?japan,park',
			category: '旅行',
		},
		{
			id: 5,
			title: '桜の品種',
			excerpt:
				'ソメイヨシノだけじゃない！様々な桜の品種について解説します。早咲きから遅咲きまで、日本各地に広がる多様な桜の世界をご紹介。',
			date: '2024-03-20',
			author: '伊藤 博士',
			readTime: '7分',
			imageUrl: 'https://source.unsplash.com/random/600x400/?cherry,tree',
			category: '植物学',
		},
		{
			id: 6,
			title: '桜と俳句',
			excerpt:
				'桜をテーマにした名俳句の数々と、その解釈を紹介。季語としての桜の使われ方や、俳人たちが捉えた桜の表情について考察します。',
			date: '2024-03-25',
			author: '中村 詩人',
			readTime: '5分',
			imageUrl:
				'https://source.unsplash.com/random/600x400/?japanese,calligraphy',
			category: '文学',
		},
	]

	// ページロード時にスクロールをトップへ
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	// 花びらの密度設定（中程度）
	const petalDensity = 'medium'

	return (
		<div className="min-h-screen bg-gradient-to-b from-pink-50 via-pink-50 to-white relative overflow-hidden">
			{/* リアルな桜の木と背景 */}
			<CherryBlossom className="fixed inset-0 w-full h-full object-cover pointer-events-none" />

			{/* アニメーションする花びらエフェクト */}
			<AnimatedPetals count={40} density={petalDensity} />

			{/* メインコンテンツ */}
			<main className="relative z-10 container mx-auto px-4 py-8">
				{/* シンプルなタイトル */}
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-pink-800 relative inline-block">
						桜ブログ
						<span className="absolute bottom-0 left-0 right-0 h-1 bg-pink-400 rounded-full" />
					</h1>
				</div>

				{/* 記事グリッド */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
					{articles.map((article, index) => (
						<ArticlePetal
							key={article.id}
							article={article}
							index={index}
							className="transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg"
						/>
					))}
				</div>

				{/* 和風の装飾的な区切り線 */}
				<div className="mt-16 flex items-center justify-center">
					<div className="w-16 h-px bg-pink-200" />
					<div className="mx-4">
						<svg
							className="w-6 h-6 text-pink-300"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M11,9.93v4.14c0,0.55,0.45,1,1,1s1-0.45,1-1V9.93c0.61-0.35,1-0.99,1-1.72c0-1.1-0.9-2-2-2s-2,0.9-2,2C10,8.94,10.39,9.58,11,9.93z" />
						</svg>
					</div>
					<div className="w-16 h-px bg-pink-200" />
				</div>

				{/* フッター */}
				<footer className="mt-8 text-center text-gray-600 text-sm pb-10">
					<div className="flex justify-center space-x-6 mb-4">
						<a
							href="#"
							className="text-pink-400 hover:text-pink-600 transition-colors"
						>
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
							</svg>
						</a>
						<a
							href="#"
							className="text-pink-400 hover:text-pink-600 transition-colors"
						>
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
							</svg>
						</a>
						<a
							href="#"
							className="text-pink-400 hover:text-pink-600 transition-colors"
						>
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
							</svg>
						</a>
					</div>
					<div className="border-t border-pink-100 pt-4">
						<p>© 2024 桜ブログ All Rights Reserved.</p>
						<div className="flex justify-center mt-2 space-x-4 text-xs text-gray-500">
							<a href="#" className="hover:text-pink-600 transition-colors">
								プライバシーポリシー
							</a>
							<a href="#" className="hover:text-pink-600 transition-colors">
								利用規約
							</a>
							<a href="#" className="hover:text-pink-600 transition-colors">
								お問い合わせ
							</a>
						</div>
					</div>
				</footer>
			</main>
		</div>
	)
}
