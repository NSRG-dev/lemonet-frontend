import { icons } from '@/assets'
import { Input } from '../ui'
import s from './TableHeaderTop.module.scss'

export const TableHeaderTop = () => {
	return (
		<div className={s.top}>
			<div className={s.balance}>
				<span className={s.icon}>
					<img src={icons.money} alt='money' />
				</span>

				<div className={s.infoBalance}>
					<p>Overall balance</p>

					<div className={s.sum}>
						<span>
							<img src={icons.coin} alt='coin' />
							100 490
						</span>
						<b>=</b>
						<span>
							<img src={icons.tcoin} alt='coin' />
							120 490
						</span>
					</div>
				</div>
			</div>

			<Input open placeholder='Search for cryptocurrency' newClass={s.input} />
		</div>
	)
}
