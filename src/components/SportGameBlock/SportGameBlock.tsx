import { icons } from '@/assets'
import s from './SportGameBlock.module.scss'

export const SportGameBlock = () => (
	<div className={s.blockSportGame}>
		<div className={s.top}>
			<div className={s.side}>
				<img src='/public/image 21.jpeg' alt='lang' />
				<span>European</span>
			</div>
			<div className={s.time}>
				<span>15:30</span>
				<span>12 July</span>
			</div>
		</div>
		<div className={s.middle}>
			<div className={s.game}>
				<img src={icons.gamev} alt='gamev' />
				<h3>Manchester United</h3>
			</div>
			<span className={s.vs}>VS</span>
			<div className={s.game}>
				<img src={icons.gamev} alt='gamev' />
				<h3>Manchester United</h3>
			</div>
		</div>
		<div className={s.bottom}>
			<div className={s.gameLeft}>
				<span>Over</span>
				<b>1.32</b>
			</div>
			<div className={s.gameRight}>
				<span>Over</span>
				<b>1.32</b>
			</div>
		</div>
	</div>
)
