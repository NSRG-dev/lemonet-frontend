import { Linkback } from '@/components/LinkBack/Linkback'
import s from './PromotionInfo.module.scss'

export const PromotionInfo = () => {
	return (
		<div className={s.promotionInfo}>
			<Linkback />
			<h2>10X POINTS every tuesd...</h2>
			<div className={s.card}>
				<div className={s.cardInfo}>
					<img src='/image 13.png' alt='Image game' />

					<div className={s.description}>
						<h2>Text content</h2>
						<p>
							This Privacy Policy describes in detail how we collect, use,
							store, and share your personal information when you access our
							casino website, create an account, participate in games, and
							interact with any services offered on the platform. We are fully
							committed to safeguarding your personal data and ensuring that all
							your interactions with our services remain private and secure.
							Please read this document carefully to understand our policies and
							practices regarding your information. By using our services, you
							agree to the terms outlined in this Privacy Policy. If you do not
							agree with any part of this policy, we advise you to refrain from
							using our platform.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
