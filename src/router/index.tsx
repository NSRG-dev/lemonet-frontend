import App from '@/App'
import { PageNotFound } from '@/pages/404/PageNotFound'
import { Affiliates } from '@/pages/Affiliates/Affiliates'
import { Help } from '@/pages/Help/Help'
import { Home } from '@/pages/Home/Home'
import { Profile } from '@/pages/Profile/Profile'
import { PromotionInfo } from '@/pages/PromotionInfo/PromotionInfo'
import { Promotions } from '@/pages/Promotions/Promotions'
import { SlotGame } from '@/pages/SlotGame/SlotGame'
import { Slots } from '@/pages/Slots/Slots'
import { Sport } from '@/pages/Sport/Sport'
import { VipProgram } from '@/pages/VipProgram/VipProgram'
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
			},
			{
				path: '/slots/:id',
				element: <SlotGame />,
			},
			{
				path: '/promotions',
				element: <Promotions />,
			},
			{
				path: '/promotions/:id',
				element: <PromotionInfo />,
			},
			{
				path: '/affiliates',
				element: <Affiliates />,
			},
			{
				path: '/help',
				element: <Help />,
			},
			{
				path: '/profile/:id',
				element: <Profile />,
			},
			{
				path: '/vipprogram',
				element: <VipProgram />,
			},
			{
				path: '/sport',
				element: <Sport />,
			},
			{
				path: '*',
				element: <PageNotFound />,
			},
		],
	},
])

export default router
