import { SakuraBackground } from '@/components/SakuraBackground'
import { ChatProvider } from '@/context/ChatContext'
import { Router } from '@/routes/router'

export default function App() {
	return (
		<div>
			<ChatProvider>
				<SakuraBackground />
				<Router />
			</ChatProvider>
		</div>
	)
}
