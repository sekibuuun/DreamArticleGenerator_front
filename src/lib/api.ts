import type { Article } from '@/types/index'

// モックデータ - API開発が完了するまでの仮データ
const mockArticles: Article[] = [
	{
		id: 1,
		title: '春の夢',
		timestamp: '2025年02月15日',
		summary: '桜の季節に見た美しい夢について',
	},
	{
		id: 2,
		title: '未来への一歩',
		timestamp: '2025年02月20日',
		summary: '新しい挑戦と希望について考えたこと',
	},
	{
		id: 3,
		title: '星空の下で',
		timestamp: '2025年02月25日',
		summary: '夜空を見上げて思ったこと',
	},
]

// キャッシュのための変数
let cachedArticles: Article[] | null = null
let isFetching = false

// 記事データを取得する関数 - メモ化してリクエストを一度だけ行う
export function fetchArticles(): Promise<Article[]> {
	// すでにキャッシュされたデータがある場合はそれを返す
	if (cachedArticles) {
		return Promise.resolve(cachedArticles)
	}

	// 現在フェッチ中なら進行中のリクエストを共有するための遅延Promise
	if (isFetching) {
		return new Promise((resolve) => {
			// キャッシュされるまで50ms毎に確認
			const checkCache = () => {
				if (cachedArticles) {
					resolve(cachedArticles)
				} else {
					setTimeout(checkCache, 50)
				}
			}
			checkCache()
		})
	}

	// 新しいリクエストを開始
	isFetching = true

	return fetch('http://127.0.0.1:5000/api/articles')
		.then((response) => {
			if (!response.ok) {
				console.warn(
					`APIエンドポイントにアクセスできません: ${response.status}`,
				)
				// APIが404または他のエラーの場合はモックデータを返す
				cachedArticles = mockArticles
				return mockArticles
			}
			return response.json()
		})
		.then((data) => {
			// 結果をキャッシュ
			cachedArticles = data
			return data
		})
		.catch((error) => {
			console.error('API呼び出し中にエラーが発生しました:', error)
			// エラー時はモックデータを返してキャッシュ
			cachedArticles = mockArticles
			return mockArticles
		})
		.finally(() => {
			isFetching = false
		})
}

// キャッシュをクリアするための関数（必要な場合）
export function clearArticlesCache(): void {
	cachedArticles = null
	isFetching = false
}

// 実際のAPIの代わりにモックデータを返す開発用関数
export function fetchMockArticles(): Promise<Article[]> {
	return Promise.resolve(mockArticles)
}
