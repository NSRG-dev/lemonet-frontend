import close from '@/assets/close.svg'
import { Link } from 'react-router-dom'
import { Button } from '../ui'
import s from './HomeBanner.module.scss'

interface HomeBannerProps {
	image: string
	description: string
	buttonText: string
	deleteBanner?: () => void
	role?: string
}

export const HomeBanner = ({
	image,
	description,
	buttonText,
	deleteBanner,
	role,
}: HomeBannerProps) => {
	return (
		<div
			className={s.banner}
			style={{
				backgroundImage: `url(${image})`,
			}}
		>
			{role === 'admin' && (
				<Button type='icon' newClass={s.detele} onClick={deleteBanner}>
					<img src={close} alt='close' loading='lazy' />
				</Button>
			)}
			<p>{description}</p>
			<Button type='default'>
				<Link to={'/sport'}>{buttonText}</Link>
			</Button>
		</div>
	)
}
