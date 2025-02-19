import { icons } from '@/assets'
import styles from '@/components/TableSport/TableSport.module.scss'

interface TableRowMobileProps {
	teams: { name: string; logo: string }[]
	scores?: string[]
	odds?: number[]
	option: string
}

export const TableRowMobile = ({
	teams,
	scores,
	odds,
	option,
}: TableRowMobileProps) => (
	<div className={styles.tableRow}>
		<div className={styles.tableValueTeamMobile}>
			<div className={styles.timeMobile}>
				<img src={icons.star} alt='star' />
				<span>16:00</span>
				<b>12 July</b>
			</div>
			<div className={styles.againstWhomMobile}>
				{teams.map((team, index) => (
					<>
						<div key={index} className={styles.teamMobile}>
							<img src={team.logo} alt='' />
							<span>{team.name}</span>
						</div>
						{index === 0 && <span className={styles.vs}>VS</span>}
					</>
				))}
			</div>
		</div>
		<div className={styles.tableBodyMobile}>
			<div className={styles.tableRowLeftMobile}>
				{option === 'Live' && scores && (
					<div className={styles.mobileResult}>
						<span>{scores.join(':')}</span>
					</div>
				)}
				{odds?.map((value, idx) => (
					<div key={idx} className={styles.tableValueMobile}>
						<span>{value}</span>
					</div>
				))}
			</div>
			<div className={styles.tableValueBtnMobile}>
				<span>999+</span>
			</div>
		</div>
	</div>
)
