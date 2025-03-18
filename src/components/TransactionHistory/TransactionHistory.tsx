import { icons } from '@/assets'
import {
	transactionHistoryTableData,
	transactionHistoryTableHeaders,
} from '@/constant/tableData'
import { TableDataTransactionHistory } from '@/types/table'
import { GenericTable } from '../GenericTable/GenericTable'
import { TableRow } from '../TableRow/TableRow'
import s from './TransactionHistory.module.scss'

interface TransactionHistoryProps {
	isTabs: string
	setTabs: (value: string) => void
}

export const TransactionHistory = ({
	isTabs,
	setTabs,
}: TransactionHistoryProps) => {
	const renderCells = (data: TableDataTransactionHistory) => (
		<>
			<div className={s.cell}>
				<img src={icons.avatar} alt='avatar' />
				<h4>{data.type}</h4>
			</div>
			<div className={s.cell}>
				<span>{data.time}</span>
				<span>{data.date}</span>
			</div>
			<div className={s.cell}>
				<span>
					<img src={icons.coin} alt='coin' /> {data.balanceBefore}
				</span>
			</div>
			<div className={s.cell}>
				<span>
					<img src={icons.coin} alt='coin' /> <b>+</b>
					{data.amount}
				</span>
			</div>
			<div className={s.cell}>
				<span>
					<div className={s.status}>
						<img src={icons.chekedTable} alt='checkbox' />
					</div>
					<b>{data.status}</b>
				</span>
			</div>
			<div className={s.cell}>
				<span>
					<img src={icons.coin} alt='coin' /> {data.balanceAfter}
				</span>
			</div>
		</>
	)

	const renderRow = (
		data: TableDataTransactionHistory,
		index: number,
		isOpenInfo: boolean,
		setOpenInfo: (index: number) => void
	) => (
		<>
			<TableRow
				key={index}
				data={data}
				isOpenInfo={isOpenInfo}
				setOpenInfo={setOpenInfo}
				index={index}
				renderCells={renderCells}
			/>
		</>
	)

	return (
		<GenericTable
			headers={transactionHistoryTableHeaders}
			data={transactionHistoryTableData}
			renderRow={renderRow}
			title='Your transactions history'
			description='Controle your earnings'
			tabs={['DAILY', 'WEEKLY', 'MONTHLY']}
			isTabs={isTabs}
			setTabs={setTabs}
			showHeaderTop={true}
		/>
	)
}
