import { icons } from '@/assets'
import { Link } from 'react-router-dom'
import { Button } from '../ui'
import s from './PromotionCard.module.scss'

interface PromotionCardProps {
	promotion?: {
		id: string
		title: string
		content: string
		media?: {
			id: string
			url: string
			type: string
		}
	}
	role: string | undefined
	handleDeletePromotion: (id: string) => void
}

export const PromotionCard = ({
	promotion,
	handleDeletePromotion,
	role,
}: PromotionCardProps) => {
	if (!promotion) {
		return null
	}

	return (
		<Link to={`/promotions/${promotion.title}`}>
			<article className={s.card}>
				<img
					src={promotion.media?.url || '/public/image 13.png'}
					alt='game'
					className={s.image}
				/>
				{role === 'admin' && (
					<Button
						newClass={s.btnHover}
						type='default'
						onClick={e => {
							e.preventDefault()
							e.stopPropagation()
							handleDeletePromotion(promotion.id)
						}}
					>
						Delete
					</Button>
				)}
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
