import { getCurrentUser } from '@/api/chat'
import { IUser } from '@/api/chat/types'
import { icons } from '@/assets'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import s from './ProfileHeader.module.scss'

interface ProfileHeaderProps {
	isOpen: boolean
	handleToggle: () => void
	isAuthenticated: boolean
}

const navigation = [
	{
		label: 'Personal information',
		path: '/profile/d',
	},
	{
		label: 'Referal system',
		path: '/profile/d',
	},
	{
		label: 'Game history',
		path: '/profile/d',
	},
	{
		label: 'Transactions history',
		path: '/profile/d',
	},
]

export const ProfileHeader = ({
	isOpen,
	handleToggle,
	isAuthenticated,
}: ProfileHeaderProps) => {
	const [user, setUser] = useState<IUser | null>(null)

	useEffect(() => {
		if (isAuthenticated) {
			getCurrentUser()
				.then(response => {
					console.log('Server response:', response)
					setUser(response)
				})
				.catch(error =>
					console.error('Ошибка загрузки данных пользователя:', error)
				)
		}
	}, [isAuthenticated])
	return (
		<div className={s.profileOption}>
			<div className={s.block} onClick={handleToggle}>
				<img src={icons.avatar} alt='avatar' loading='lazy' />
				<div className={s.optText}>
					<span>ACCOUNT</span>
					<div className={s.rank}>
						<span></span>
						<b>{user?.role.name}</b>
					</div>
				</div>
				<button
					aria-expanded={isOpen}
					className={s.arrowButton}
					style={{
						transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
						transition: 'transform 0.3s ease-in-out',
					}}
				>
					<img src={icons.arrow} alt='Toggle options' loading='lazy' />
				</button>
			</div>
			<ul className={`${s.opt} ${isOpen ? s.open : ''}`}>
				{navigation.map((link, index) => (
					<li key={index}>
						<Link to={link.path}>{link.label}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
