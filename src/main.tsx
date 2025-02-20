import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './Context/AuthProvider.tsx'
import { BurgerProvider } from './Context/BurgerProvider.tsx'
import { ChatProvider } from './Context/ChatProvider.tsx'
import './index.css'
import { router } from './router/index.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BurgerProvider>
			<ChatProvider>
				<AuthProvider>
					<RouterProvider router={router} />
				</AuthProvider>
			</ChatProvider>
		</BurgerProvider>
	</StrictMode>
)
