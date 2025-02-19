import { icons } from '@/assets'
import { useState } from 'react'
import s from './TableResultSport.module.scss'

const TableRow = () => {
	const [isLive, setLive] = useState(false)

	return (
		<div className={s.tableRow}>
			<div className={s.tableValueTeam}>
				<div className={s.time}>
					<img src={icons.star} alt='star' />
					<span>16:00</span>
					<b>12 July</b>
				</div>
				<div className={s.againstWhom}>
					<div className={s.team}>
						<img src={icons.gamev} alt='' />
						<span>Arsenal</span>
					</div>
					<span className={s.vs}>VS</span>
					<div className={s.team}>
						<img src={icons.gamev} alt='' />
						<span>Arsenal</span>
					</div>
				</div>
			</div>
			<div className={s.tableValueLeft}>
				{['4:0', '1:3', '0:3'].map((value, idx) => (
					<div key={idx} className={s.tableValue2}>
						<span>{value}</span>
					</div>
				))}
				<div
					className={`${s.tableValueBtn} ${isLive ? s.active : ''}`}
					onClick={() => setLive(!isLive)}
				>
					<span>{!isLive ? 'COMPLETE' : 'LIVE'}</span>
				</div>
			</div>
		</div>
	)
}

export const TableResultSport = () => {
	return (
		<div className={s.table}>
			<div className={s.tbody}>
				{Array.from({ length: 3 }, (_, index) => (
					<TableRow key={index} />
				))}
			</div>
		</div>
	)
}
