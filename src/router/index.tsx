import App from '@/App'
import { Home } from '@/pages/Home/Home'
import { Slots } from '@/pages/Slots/Slots'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/slots', element: <Slots /> },
		],
	},
])
