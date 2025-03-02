import { icons } from '@/assets'
import { Link } from 'react-router-dom'
import s from './ProfileHeader.module.scss'

interface ProfileHeaderProps {
	isOpen: boolean
	handleToggle: () => void
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

export const ProfileHeader = ({ isOpen, handleToggle }: ProfileHeaderProps) => {
	return (
		<div className={s.profileOption}>
			<div className={s.block} onClick={handleToggle}>
				<img src={icons.avatar} alt='avatar' loading='lazy' />
				<div className={s.optText}>
					<span>ACCOUNT</span>
					<div className={s.rank}>
						<span></span>
						<b>Silver</b>
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
