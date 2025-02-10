import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { BurgerProvider } from './Context/BurgerProvider.tsx'
import './index.css'
import { router } from './router/index.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BurgerProvider>
			<RouterProvider router={router} />
		</BurgerProvider>
	</StrictMode>
)
