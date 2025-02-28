import type { ErrorBoundaryProps, ErrorBoundaryState } from '@/types'
import { Component, type ErrorInfo, type ReactNode } from 'react'

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = {
			hasError: false,
			error: null,
		}
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return {
			hasError: true,
			error,
		}
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error(
			'エラーバウンダリーがエラーをキャッチしました:',
			error,
			errorInfo,
		)
	}

	render(): ReactNode {
		const { hasError, error } = this.state
		const { children, fallback: Fallback } = this.props

		if (hasError && error) {
			return <Fallback error={error} />
		}

		return children
	}
}
