import { icons } from '@/assets'
import s from './GettingStartedSection.module.scss'

export const GettingStartedSection = () => {
	return (
		<div className={s.bannersStarted}>
			<h4>
				<img src={icons.bonuses} alt='' />
				Getting started
			</h4>

			<div className={s.container}>
				{Array.from({ length: 3 }, (_, index) => (
					<div key={index} className={s.banner}>
						<div className={s.text}>
							<div className={s.top}>
								<span>{index + 1}</span>
								<h3>Sign Up Now</h3>
							</div>
							<p>
								Go through the registration process and become part of our
								community!
							</p>
						</div>
						<img src={icons.rocket} alt='rocket' className={s.image} />
					</div>
				))}
			</div>
		</div>
	)
}
