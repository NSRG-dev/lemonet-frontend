import { icons } from '@/assets'
import { Link } from 'react-router-dom'
import s from './PromotionCard.module.scss'

export const PromotionCard = () => {
	return (
		<article className={s.card}>
			<img src='/public/image 13.jpeg' alt='game' className={s.image} />
			<div className={s.info}>
				<h3>10X POINTS every tuesd...</h3>
				<Link to={'/id'}>
					Details <img src={icons.arrow} alt='' />
				</Link>
			</div>
		</article>
	)
}
