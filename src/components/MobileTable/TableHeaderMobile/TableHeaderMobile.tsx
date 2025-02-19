import styles from '@/components/TableSport/TableSport.module.scss'

interface TableHeaderMobileProps {
	headers: string[]
}

export const TableHeaderMobile = ({ headers }: TableHeaderMobileProps) => (
	<div className={styles.tableHeader}>
		{headers.map((header, index) => (
			<div key={index} className={styles.tableHeaderCell}>
				<span>{header}</span>
			</div>
		))}
	</div>
)
