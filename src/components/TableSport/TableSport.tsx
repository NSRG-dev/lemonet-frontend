import { icons } from '@/assets'
import { useState } from 'react'
import { GameMobile } from '../MobileTable/GameMobile/GameMobile'
import { TableBodyMobile } from '../MobileTable/TableBodyMobile/TableBodyMobile'
import { TableBody } from '../Table/TableBody/TableBody'
import { TableHeader } from '../Table/TableHeader/TableHeader'
import styles from './TableSport.module.scss'

interface TableSportbookProps {
	option: string
}

interface TableMobileProps {
	option: string
}

export const TableSportbook = ({ option }: TableSportbookProps) => {
	const [isOpenMore, setOpenMore] = useState(true)

	const headers = ['1', 'X', '2', '1X', '12', '2X', 'More']
	const data = [
		{
			teams: [
				{ name: 'Manchester United', logo: icons.gamev },
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

export const TableMobile = ({ option }: TableMobileProps) => {
	const headers = [option === 'Live' && '', '1', 'X', '2'].filter(
    (header): header is string => typeof header === 'string'
  );
	const data = [
		{
			teams: [
				{ name: 'Manchester United', logo: icons.gamev },
				{ name: 'Manchester United', logo: icons.gamev },
			],
			scores: ['4', '0'],
			odds: [1.56, 3.45, 1.32],
		},
	]

	return (
		<div className={styles.tableMobile}>
			<GameMobile />
			<div className={styles.tableModileRe}>
				<TableBodyMobile data={data} option={option} headers={headers} />
			</div>
		</div>
	)
}
