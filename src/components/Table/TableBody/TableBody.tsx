import { TableRow } from '../TableRow/TableRow'
import s from './TableBody.module.scss'

interface TableBodyProps {
	option: string
	data: {
		teams: { name: string; logo: string }[]
		scores?: string[]
		odds?: number[]
	}[]
	isOpenMore?: boolean
}

export const TableBody = ({ option, data, isOpenMore }: TableBodyProps) => (
	<div className={`${s.tbody} ${isOpenMore ? s.open : ''}`}>
		{data.map((row, index) => (
			<TableRow key={index} option={option} {...row} />
		))}
	</div>
)
