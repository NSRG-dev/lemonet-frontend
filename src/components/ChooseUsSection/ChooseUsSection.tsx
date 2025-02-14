import { icons } from '@/assets'
import s from './ChooseUsSection.module.scss'

export const ChooseUsSection = () => {
	return (
		<div className={s.choose}>
			<div className={s.title}>
				<h2>Why Choose Us?</h2>
				<p>
					Experience the thrill of gaming with unmatched rewards and premium
					features!
				</p>
			</div>

			<div className={s.grid}>
				{Array.from({ length: 4 }, (_, index) => (
					<div key={index} className={s.chooseCard}>
						<span>
							<img src={icons.bonuses} alt='bonuses' />
						</span>
						<div className={s.description}>
							<h3>Unbeatable Bonuses</h3>
							<p>
								Enjoy generous rewards, free spins, and exclusive promotions
								tailored just for you.
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
