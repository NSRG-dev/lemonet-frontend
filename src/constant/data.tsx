import { icons } from '@/assets'
import { IChat } from '@/types/chat'

export const COMMENTS: IChat[] = [
	{
		id: '11',
		avatarSrc: icons.avatar,
		username: '@pro',
		time: '12:00 PM',
		message: 'bees on my head',
		muted: false
	},
	{
		id: '12',
		avatarSrc: icons.avatar,
		username: '@canes',
		time: '12:00 PM',
		prefix: 'Admin',
		message: 'Anxiety don’t let the pressure get to your head !!! @3493002',
		color: 'rgba(255, 215, 12, 0.09)',
		muted: false
	},
]
