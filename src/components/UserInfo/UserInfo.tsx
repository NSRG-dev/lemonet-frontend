import { Link } from 'react-router-dom'
import s from './UserInfo.module.scss'

interface UserInfoProps {
	avatarSrc: string
	username: string
	prefix?: string
	time: string
}

export const UserInfo = ({
	avatarSrc,
	username,
	prefix,
	time,
}: UserInfoProps) => (
	<div className={s.user}>
		<div className={s.left}>
			<Link to={'/profile'}>
				<img src={avatarSrc} alt='avatar' />
			</Link>
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
