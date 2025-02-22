import { icons } from '@/assets'
import { Button } from '@/components/ui'
import styles from './TableHeader.module.scss'

interface TableHeaderProps {
	headers: string[]
	isOpenMore?: boolean
	setOpenMore?: (value: boolean) => void
}

export const TableHeader = ({
	headers,
	isOpenMore,
	setOpenMore,
}: TableHeaderProps) => (
	<div className={styles.tableHeader}>
		<div className={styles.game}>
			<img src='/public/image 21.jpeg' alt='' />
			<span> Europe - European Championship. Final</span>
		</div>
		<div className={styles.headertablerow}>
			{headers.map((header, index) => (
				<div
					key={index}
					className={styles.tableHeaderCell}
					onClick={() => header === 'More' && setOpenMore?.(!isOpenMore)}
				>
					<span>
						{header}
						{header === 'More' && (
							<Button type='icon'>
								<img
									src={icons.arrow}
									alt='arrow'
									style={{
										transform: isOpenMore ? 'rotate(180deg)' : 'rotate(0deg)',
										transition: 'transform 0.3s ease-in-out',
										cursor: 'pointer',
									}}
								/>
							</Button>
						)}
					</span>
				</div>
			))}
		</div>
	</div>
)
