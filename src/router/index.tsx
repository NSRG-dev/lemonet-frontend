import App from '@/App'
import { Home } from '@/pages/Home/Home'
import { Promotions } from '@/pages/Promotions/Promotions'
import { SlotGame } from '@/pages/SlotGame/SlotGame'
import { Slots } from '@/pages/Slots/Slots'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '/', element: <Home /> },
			{
				path: '/slots',
				element: <Slots />,
				children: [],
			},
			{
				path: '/slots/:id',
				element: <SlotGame />,
			},
			{
				path: '/promotions',
				element: <Promotions />,
			},
		],
	},
])
