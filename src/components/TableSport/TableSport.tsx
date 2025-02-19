import { icons } from '@/assets'
import { useState } from 'react'
import { TableBody } from '../Table/TableBody/TableBody'
import { TableHeader } from '../Table/TableHeader/TableHeader'
import styles from './TableSport.module.scss'

interface TableSportbookProps {
	option: string
}

export const TableSportbook = ({ option }: TableSportbookProps) => {
	const [isOpenMore, setOpenMore] = useState(true)

	const headers = ['1', 'X', '2', '1X', '12', '2X', 'More']
	const data = [
		{
			teams: [
				{ name: 'Arsenal', logo: icons.gamev },
				{ name: 'Manchester United', logo: icons.gamev },
			],
			scores: ['4', '0'],
			odds: [1.56, 3.45, 1.32, 1.56, 3.45, 1.32],
		},
	]

	return (
		<div className={styles.table}>
			<TableHeader
				headers={headers}
				isOpenMore={isOpenMore}
				setOpenMore={setOpenMore}
			/>
			<TableBody option={option} data={data} isOpenMore={isOpenMore} />
		</div>
	)
}

export const TableMobile = ({ option }: TableSportbookProps) => (
	<div className={styles.tableModile}>
		<div className={styles.gameModile}>
			<img src={icons.star} alt='star' />
			<img src='/public/image 21.jpeg' alt='' />
			<span> Europe - European Championship. Final</span>
		</div>

		<div className={styles.tableModileRe}>
			<div className={styles.tableValueTeamModile}>
				<div className={styles.timeModile}>
					<div className={styles.timeInfo}>
						<img src={icons.star} alt='star' />
						<span>16:00</span>
						<b>12 July</b>
					</div>
				</div>
				<div className={styles.againstWhomModile}>
					<div className={styles.teamModile}>
						<img src={icons.gamev} alt='' />
						<span>Manchester United</span>
					</div>
					<span className={styles.vs}>VS</span>
					<div className={styles.teamModile}>
						<img src={icons.gamev} alt='' />
						<span>Manchester United</span>
					</div>
				</div>
			</div>
			<div className={styles.tableHeader}>
				{option === 'Live' && (
					<div className={styles.tableHeaderCell}>
						<span></span>
					</div>
				)}
				{['1', 'X', '2', ''].map(header => (
					<div key={header} className={styles.tableHeaderCell}>
						<span>{header}</span>
					</div>
				))}
			</div>
			<div className={styles.tableBody}>
				<div className={styles.tableRow}>
					<div className={styles.tableModileRowleft}>
						{option === 'Live' && (
							<div className={styles.modileResult}>
								<span>4:0</span>
							</div>
						)}
						{[1.56, 3.45, 1.32].map((value, idx) => (
							<div key={idx} className={styles.tableValueModile}>
								<span>{value}</span>
							</div>
						))}
					</div>
					<div className={styles.tableValueBtn}>
						<span>999+</span>
					</div>
				</div>
			</div>
		</div>
	</div>
)
