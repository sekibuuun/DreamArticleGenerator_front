import { useEffect, useState } from 'react'

interface UseSVGLoaderResult {
	svgContent: string
	loading: boolean
	error: Error | null
}

/**
 * SVGファイルを非同期に読み込むためのカスタムフック
 * @param {string} svgPath - 読み込むSVGファイルのパス
 * @returns {UseSVGLoaderResult} SVGの内容、読み込み状態、エラー情報
 */
export const useSVGLoader = (svgPath: string): UseSVGLoaderResult => {
	const [svgContent, setSvgContent] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		// SVGファイルを読み込む非同期関数
		const loadSVG = async () => {
			try {
				setLoading(true)
				const response = await fetch(svgPath)

				if (!response.ok) {
					throw new Error(`Failed to load SVG: ${response.statusText}`)
				}

				const text = await response.text()
				setSvgContent(text)
				setLoading(false)
			} catch (err) {
				console.error('Error loading SVG:', err)
				setError(err instanceof Error ? err : new Error(String(err)))
				setLoading(false)
			}
		}

		loadSVG()
	}, [svgPath])

	return { svgContent, loading, error }
}

export default useSVGLoader
