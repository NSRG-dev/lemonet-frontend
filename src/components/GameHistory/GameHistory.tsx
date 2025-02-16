import { icons } from '@/assets'
import {
	gameHistoryTableData,
	gameHistoryTableHeaders,
} from '@/constant/tableData'
import { GameHistoryData } from '@/types/table'
import { GenericTable } from '../GenericTable/GenericTable'
import { TableRow } from '../TableRow/TableRow'
import s from './GameHistory.module.scss'

interface GameHistoryProps {
	isTabs: string
	setTabs: (value: string) => void
}

export const GameHistory = ({ isTabs, setTabs }: GameHistoryProps) => {
	const renderCells = (data: GameHistoryData) => (
		<>
			<div className={s.cell}>
				<img src={icons.avatar} alt='avatar' />
				<h4>{data.game}</h4>
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
					<img src={icons.coin} alt='coin' /> {data.bet}
				</span>
			</div>
			<div className={s.cell}>
				<span>{data.multiplier}</span>
			</div>
			<div className={s.cell}>
				<span>
					<img src={icons.coin} alt='coin' /> <b>+</b>
					{data.profit}
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
		data: GameHistoryData,
		index: number,
		isOpenInfo: boolean,
		setOpenInfo: (index: number) => void
	) => (
		<TableRow
			key={index}
			data={data}
			isOpenInfo={isOpenInfo}
			setOpenInfo={setOpenInfo}
			index={index}
			renderCells={renderCells}
		/>
	)

	return (
		<GenericTable
			headers={gameHistoryTableHeaders}
			data={gameHistoryTableData}
			renderRow={renderRow}
			title='Your game history'
			description='Controle your earnings'
			tabs={['DAILY', 'WEEKLY', 'MONTHLY']}
			isTabs={isTabs}
			setTabs={setTabs}
		/>
	)
}
