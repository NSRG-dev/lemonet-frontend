import styles from '@/components/TableSport/TableSport.module.scss'
import { TableRowMobile } from '../TableRowMobile/TableRowMobile'

interface TableBodyMobileProps {
	data: {
		teams: { name: string; logo: string }[]
		scores?: string[]
		odds?: number[]
	}[]
	option: string
	headers: string[]
}

export const TableBodyMobile = ({
	data,
	option,
	headers,
}: TableBodyMobileProps) => (
	<div className={styles.tableBody}>
		{data.map((row, index) => (
			<TableRowMobile key={index} option={option} {...row} headers={headers} />
		))}
	</div>
)
