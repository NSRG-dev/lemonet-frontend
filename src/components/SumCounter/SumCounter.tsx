import { icons } from '@/assets'
import { Button } from '@/components/ui'
import s from './SumCounter.module.scss'

export const SumCounter = () => (
	<div className={s.sumCounter}>
		<div className={s.sum}>
			<img src={icons.money} alt='money' />
			<span>
				<img src={icons.coin} alt='coin' />
				100 490
			</span>
		</div>
		<div className={s.countBtn}>
			<Button type='default'>+</Button>
			<Button type='icon'>-</Button>
		</div>
	</div>
)
