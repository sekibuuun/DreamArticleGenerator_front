import { SakuraBackground } from '@/components/SakuraBackground'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

// 記事のインターフェース
interface Article {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  readingTime: string
}

export const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 実際の環境では、APIから記事データを取得する処理を実装
    // 現在はモックデータを使用
    const fetchArticle = async () => {
      try {
        setLoading(true)
        
        // モックデータ（実際の実装ではAPIリクエストに置き換え）
        const mockArticle: Article = {
          id: id || '1',
          title: '夢を追いかける勇気について',
          content: `
# 夢を追いかける勇気について

桜が舞い散る季節、新しい出発の時期に思うこと。

## なぜ夢は大切なのか

私たちの人生には、目標や夢が必要です。それは**単なる願望**ではなく、人生の道標となるものです。

> 夢は、見るものではなく、叶えるものである。

### 夢を叶えるためのステップ

1. **明確なビジョンを持つ**
   - 具体的な目標を設定する
   - その目標に向かって計画を立てる

2. **小さな一歩から始める**
   - 日々の積み重ねが重要
   - 失敗を恐れず挑戦する

3. **周りの支えを大切にする**
   - 同じ志を持つ仲間と繋がる
   - 助けを求めることも勇気

## まとめ

夢を追いかけることは決して簡単ではありません。しかし、その道のりこそが私たちを成長させるのです。桜が散るように、チャンスも儚いもの。今この瞬間に一歩を踏み出す勇気を持ちましょう。

---

*桜が教えてくれること - 美しさは永遠ではないが、その記憶は心に残り続ける*
          `,
          author: '山田花子',
          createdAt: '2024-03-15',
          readingTime: '5分'
        }
        
        setArticle(mockArticle)
      } catch (error) {
        console.error('記事の取得に失敗しました:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white">
        <div className="text-pink-500">読み込み中...</div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white">
        <div className="text-center">
          <p className="text-xl text-pink-800 mb-4">記事が見つかりませんでした</p>
          <Link to="/">
            <Button>記事一覧に戻る</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <SakuraBackground />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl relative">
        {/* 戻るボタン */}
        <Link to="/" className="inline-flex items-center mb-6 text-pink-700 hover:text-pink-900 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>記事一覧に戻る</span>
        </Link>
        
        {/* 記事カード */}
        <Card className="bg-white/90 backdrop-blur-md border-pink-50 shadow-lg rounded-xl overflow-hidden">
          {/* ヘッダー */}
          <div className="p-6 md:p-8 border-b border-pink-100">
            <h1 className="text-3xl md:text-4xl font-bold text-pink-800 font-japanese mb-4">
              {article.title}
            </h1>
            
            {/* メタ情報 */}
            <div className="flex flex-wrap gap-4 text-sm text-pink-600">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{article.createdAt}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>読了時間: {article.readingTime}</span>
              </div>
            </div>
          </div>
          
          {/* 記事内容 */}
          <CardContent className="p-6 md:p-8">
            <div className="prose prose-pink max-w-none">
              <ReactMarkdown>
                {article.content}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}