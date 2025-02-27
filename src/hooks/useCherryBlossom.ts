import { useEffect, useState } from 'react'

/**
 * 桜のアニメーション表示状態を管理するフック
 * @returns {Object} loaded - アニメーションが読み込まれたかどうかの状態
 */
export const useCherryBlossom = () => {
	const [loaded, setLoaded] = useState<boolean>(false)

	useEffect(() => {
		// ページ読み込み後にアニメーションを表示するための遅延
		const timer = setTimeout(() => {
			setLoaded(true)
		}, 500)

		// クリーンアップ関数
		return () => clearTimeout(timer)
	}, [])

	return { loaded }
}

export default useCherryBlossom
