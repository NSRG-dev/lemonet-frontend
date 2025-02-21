import { icons } from '@/assets'
import s from './TableHome.module.scss'

interface TableHomeProps {
	user: string
	date: string
	time: string
	deposit: string
	profit: string
}

export const TableHome = ({
	user,
	date,
	time,
	deposit,
	profit,
}: TableHomeProps) => {
	return (
		<div className={s.row}>
			<div className={s.cell}>
				<img src={icons.avatar} alt='avatar' />
				<h4>{user}</h4>
			</div>
			<div className={s.cell}>
				<img src={icons.avatar} alt='avatar' />
				<h4>{user}</h4>
			</div>
			<div className={s.cell}>
				<span>{time}</span>
				<span>{date}</span>
			</div>
			<div className={s.cell}>
				<span>
					<img src={icons.coin} alt='coin' /> {deposit}
				</span>
			</div>
			<div className={s.cell}>
				<span>2x</span>
			</div>
			<div className={s.cell}>
				<span>
					<img src={icons.coin} alt='coin' /> <b>+</b> {profit}
				</span>
			</div>
		</div>
	)
}
