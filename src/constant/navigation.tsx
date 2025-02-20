import { icons } from '@/assets'

export const socialLinks = [
	{ icon: icons.instagram, alt: 'Instagram', label: 'Instagram' },
	{ icon: icons.youtube, alt: 'YouTube', label: 'YouTube' },
	{ icon: icons.telegram, alt: 'Telegram', label: 'Telegram' },
]

export const navigationSections = [
	{
		title: 'Navigation',
		links: [
			{
				label: 'Affiliates',
				url: '/affiliates',
			},
			{
				label: 'Vip program',
				url: '/vipprogram',
			},
			{
				label: 'Promotion',
				url: '/promotions',
			},
		],
	},
	{
		title: 'Casino',
		links: [
			{
				label: 'Slots',
				url: '/slots',
			},
			{
				label: 'Live casino',
				url: '/slots/:id',
			},
			{
				label: 'Table games',
				url: '/sport',
			},
			{
				label: 'BlackJack',
				url: '/sport',
			},
		],
	},
	{
		title: 'Sport',
		links: [
			{
				label: 'Live matches',
				url: '/sport',
			},
			{
				label: 'Starting soon',
				url: '/sport',
			},
		],
	},
	{
		title: 'Help center',
		links: [
			{
				label: 'Terms & Conditions',
				url: '/help',
			},
			{
				label: 'Probably Fair',
				url: '/help',
			},
			{
				label: 'FAQ',
				url: '/help',
			},
			{
				label: 'AML',
				url: '/help',
			},
			{
				label: 'Support',
				url: '/help',
			},
		],
	},
]
