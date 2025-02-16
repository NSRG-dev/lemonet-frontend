import { useState } from 'react'
import { TableHeaderTop } from '../TableHeaderTop/TableHeaderTop'
import { Tabs } from '../ui'
import s from './GenericTable.module.scss'

interface GenericTableProps {
	headers: string[]
	data: Array<Record<string, any>>
	renderRow: (
		data: any,
		index: number,
		isOpenInfo: boolean,
		setOpenInfo: (index: number) => void
	) => React.ReactNode
	title: string
	description: string
	tabs: string[]
	isTabs: string
	setTabs: (tab: string) => void
	showHeaderTop?: boolean
}

export const GenericTable = ({
	headers,
	data,
	renderRow,
	title,
	description,
	tabs,
	isTabs,
	setTabs,
	showHeaderTop = false,
}: GenericTableProps) => {
	const [openRows, setOpenRows] = useState<Record<number, boolean>>({})

	const toggleRow = (index: number) => {
		setOpenRows(prev => ({
			...prev,
			[index]: !prev[index],
		}))
	}

	return (
		<div className={s.referalSystem}>
			<div className={s.table}>
				<div className={s.header}>
					{showHeaderTop && <TableHeaderTop />}
					<div className={s.bottom}>
						<div className={s.title}>
							<h3>{title}</h3>
							<p>{description}</p>
						</div>
						<Tabs isTab={isTabs} onClick={setTabs} tabs={tabs} />
					</div>
				</div>

				<div className={s.tables}>
					<div className={s.tableRow}>
						{headers.map((header, index) => (
							<div className={s.cell} key={index}>
								<span>{header}</span>
							</div>
						))}
						<div className={s.cellSmall}>
							<span></span>
						</div>
					</div>

					{data.map((rowData, index) => (
						<div key={index}>
							{renderRow(rowData, index, !!openRows[index], toggleRow)}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
