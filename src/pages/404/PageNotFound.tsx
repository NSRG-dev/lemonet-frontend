import { icons } from '@/assets'
import { Button } from '@/components/ui'
import s from './PageNotFound.module.scss'

export const PageNotFound = () => {
	return (
		<div className={s.overf}>
			<div className={s.content}>
				<div className={s.left}>
					<div className={s.descr}>
						<div className={s.attention}>
							<span>
								<img src={icons.info_circle} alt='info_circle' />
							</span>
							<span>Attention!</span>
						</div>

						<h1>Access to the site is restricted in your country</h1>
						<p>Try using a VPN or contact support for assistance</p>
					</div>

					<Button type='default'>Try again</Button>
				</div>

				<div className={s.right}>
					<img src={icons.notfoundimage} alt='404' />
				</div>
			</div>
		</div>
	)
}
