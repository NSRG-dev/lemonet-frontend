import { format, parseISO } from 'date-fns'
import { Button } from '../ui'
import s from './UserInfo.module.scss'

interface UserInfoProps {
	avatarSrc: string
	username: string
	prefix?: string
	time: string 
	isAuthenticated: boolean
	toggleAuth: () => void
	navigation: (value: string) => void
}

export const UserInfo = ({
	avatarSrc,
	username,
	prefix,
	time,
	isAuthenticated,
	toggleAuth,
	navigation,
}: UserInfoProps) => {
	const isValidTime =
		time && typeof time === 'string' && !isNaN(Date.parse(time))

	const formattedTime = isValidTime
		? format(parseISO(time), 'HH:mm') 
		: format(new Date(), 'HH:mm') 

	return (
		<div className={s.user}>
			<div className={s.left}>
				<Button
					type='text'
					onClick={() => {
						!isAuthenticated ? toggleAuth() : navigation(`/profile/${username}`)
					}}
				>
					<img src={avatarSrc} alt='avatar' />
				</Button>
				<span>
					{username.length > 12 ? `${username.substring(0, 12)}...` : username}
				</span>
				{prefix && <span className={s.prefix}>{prefix}</span>}
			</div>
			<div className={s.right}>
				<span>{formattedTime}</span> 
			</div>
		</div>
	)
}
