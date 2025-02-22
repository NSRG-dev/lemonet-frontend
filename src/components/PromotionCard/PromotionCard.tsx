import { icons } from '@/assets'
import { Link } from 'react-router-dom'
import { Button } from '../ui'
import s from './PromotionCard.module.scss'

export const PromotionCard = ({ index }: { index: number }) => {
	return (
		<Link to={`/promotions/${index}`}>
			<article className={s.card}>
				<img src='/public/image 13.png' alt='game' className={s.image} />
				<div className={s.info}>
					<h3>10X POINTS every tuesd...</h3>
					<Button type='text'>
						Details <img src={icons.arrow} alt='' />
					</Button>
				</div>
			</article>
		</Link>
	)
}
