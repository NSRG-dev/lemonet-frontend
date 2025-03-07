import { icons } from '@/assets'
import { Link } from 'react-router-dom'
import { Button } from '../ui'
import s from './PromotionCard.module.scss'

interface PromotionCardProps {
	promotion: {
		title: string
		image?: string
	}
}

export const PromotionCard = ({ promotion }: PromotionCardProps) => {
	return (
		<Link to={`/promotions/${promotion.title}`}>
			<article className={s.card}>
				<img
					src={promotion.image || '/public/image 13.png'}
					alt='game'
					className={s.image}
				/>
				<div className={s.info}>
					<h3>{promotion.title || '10X POINTS every tuesd...'}</h3>
					<Button type='text'>
						Details <img src={icons.arrow} alt='' />
					</Button>
				</div>
			</article>
		</Link>
	)
}
