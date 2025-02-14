import { icons } from '@/assets'
import s from './Banner.module.scss'

export const Banner = () => {
	return (
		<div className={s.banner}>
			<div className={s.text}>
				<div className={s.top}>
					<span>1</span>
					<h3>Sign Up Now</h3>
				</div>
				<p>
					Go through the registration process and become part of our community!
				</p>
			</div>
			<img src={icons.rocket} alt='rocket' className={s.image} />
		</div>
	)
}
