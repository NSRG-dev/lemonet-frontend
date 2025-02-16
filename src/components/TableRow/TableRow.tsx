import { icons } from '@/assets'
import { Button } from '@/components/ui'
import s from './TableRow.module.scss'

interface TableRowProps {
	data: Record<string, any>
	isOpenInfo: boolean
	setOpenInfo: (index: number) => void
	index: number
	renderCells: (data: any) => React.ReactNode
}

export const TableRow = ({
	data,
	isOpenInfo,
	setOpenInfo,
	index,
	renderCells,
}: TableRowProps) => (
	<>
		<div className={s.row}>
			{renderCells(data)}
			<div className={s.cellSmall}>
				<Button type='icon' onClick={() => setOpenInfo(index)}>
					<img
						src={icons.arrow}
						alt='arrow'
						style={{
							transform: isOpenInfo ? 'rotate(180deg)' : 'rotate(0deg)',
							transition: 'transform 0.3s ease',
						}}
					/>
				</Button>
			</div>
		</div>

		<div className={`${s.info} ${isOpenInfo ? s.open : ''}`}>
			<div className={s.tableRowInfo}>
				<div className={s.cellInfo}>
					<span>DATE</span>
					<div className={s.date}>
						<span>{data.time}</span>
						<span>{data.date}</span>
					</div>
				</div>
			</div>
		</div>
	</>
)
