import { icons } from '@/assets'
import { Link } from 'react-router-dom'
import s from './PromotionCard.module.scss'

export const PromotionCard = ({ index }: { index: number }) => {
	return (
		<article className={s.card}>
			<img src='/public/image 13.png' alt='game' className={s.image} />
			<div className={s.info}>
				<h3>10X POINTS every tuesd...</h3>
				<Link to={`/promotions/${index}`}>
					Details <img src={icons.arrow} alt='' />
				</Link>
			</div>
		</article>
	)
}
