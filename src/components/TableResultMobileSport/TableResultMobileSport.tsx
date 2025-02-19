import { icons } from '@/assets'
import s from './TableResultMobileSport.module.scss'

export const TableResultMobileSport = () => {
	return (
		<div className={s.tableModile}>
			<div className={s.gameModile}>
				<img src={icons.star} alt='star' />
				<img src='/public/image 21.jpeg' alt='' />
				<span> Europe - European Championship. Final</span>
			</div>

			<div className={s.tableModileRe}>
				<div className={s.tableValueTeamModile}>
					<div className={s.timeModile}>
						<div className={s.timeInfo}>
							<img src={icons.star} alt='star' />
							<span>16:00</span>
							<b>12 July</b>
						</div>
					</div>
					<div className={s.againstWhomModile}>
						<div className={s.teamModile}>
							<img src={icons.gamev} alt='' />
							<span>Manchester United</span>
						</div>
						<span className={s.vs}>VS</span>
						<div className={s.teamModile}>
							<img src={icons.gamev} alt='' />
							<span>Manchester United</span>
						</div>
					</div>
				</div>
				<div className={s.tableBody}>
					<div className={s.tableRow}>
						<div className={s.tableModileRowleft}>
							{['4:0', '1:3', '0:3'].map((value, idx) => (
								<div key={idx} className={s.tableValueModile}>
									<span>{value}</span>
								</div>
							))}
						</div>
						<div className={s.tableValueBtn}>
							<span>Completed</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
