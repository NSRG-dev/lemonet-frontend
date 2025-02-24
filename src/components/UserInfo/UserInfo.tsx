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
}: UserInfoProps) => (
	<div className={s.user}>
		<div className={s.left}>
			<Button
				type='text'
				onClick={() => {
					!isAuthenticated ? toggleAuth() : navigation('/profile')
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
			<span>{time}</span>
		</div>
	</div>
)
