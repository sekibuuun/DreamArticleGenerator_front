import { Articles } from '@/pages/Articles'
import { Chat } from '@/pages/Chat'
import { BrowserRouter, Route, Routes } from 'react-router'

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Articles />} />
				<Route path="/chat" element={<Chat />} />
			</Routes>
		</BrowserRouter>
	)
}
