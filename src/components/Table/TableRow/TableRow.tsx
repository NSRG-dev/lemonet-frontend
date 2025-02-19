import { icons } from '@/assets'
import styles from './TableRow.module.scss'

interface TableRowProps {
	option: string
	teams: { name: string; logo: string }[]
	scores?: string[]
	odds?: number[]
}

export const TableRow = ({ option, teams, scores, odds }: TableRowProps) => {
	return (
		<div className={styles.tableRow}>
			<div className={styles.tableValueTeam}>
				<div className={styles.time}>
					<img src={icons.star} alt='star' />
					<span>16:00</span>
					<b>12 July</b>
				</div>
				<div className={styles.againstWhom}>
					{teams.map((team, index) => (
						<>
							<div key={index} className={styles.team}>
								<img src={team.logo} alt='' />
								<span>{team.name}</span>
							</div>
							{index === 0 && <span className={styles.vs}>VS</span>}
						</>
					))}
				</div>
			</div>
			<div className={styles.tableValueLeft}>
				{option === 'Live' && scores && (
					<div className={styles.result}>
						<span>{scores.join(':')}</span>
					</div>
				)}
				{odds?.map((value, idx) => (
					<div key={idx} className={styles.tableValue2}>
						<span>{value}</span>
					</div>
				))}
				<div className={styles.tableValueBtn}>
					<span>999+</span>
				</div>
			</div>
		</div>
	)
}
