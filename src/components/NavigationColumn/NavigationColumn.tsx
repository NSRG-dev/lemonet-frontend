import { Button } from '../ui'
import s from './NavigationColumn.module.scss'

interface NavigationColumnProps {
	title: string
	items: string[]
	iconSrc: string
	alt: string
	isColumn: boolean
	setColumn: () => void
}

export const NavigationColumn = ({
	title,
	items,
	iconSrc,
	alt,
	isColumn,
	setColumn,
}: NavigationColumnProps) => (
	<div className={s.column}>
		<div className={s.title} onClick={setColumn}>
			<h4
				style={{
					padding: isColumn ? '4px 0 8px 0' : '4px 0 4px 0',
				}}
			>
				{title}
			</h4>
			<Button type='text'>
				<img
					src={iconSrc}
					alt={alt}
					style={{
						transform: isColumn ? 'rotate(0deg)' : 'rotate(180deg)',
						transition: 'transform 0.3s ease-in-out',
					}}
				/>
			</Button>
		</div>
		<ul className={isColumn ? s.open : ''}>
			{items.map((item, index) => (
				<li key={index}>{item}</li>
			))}
		</ul>
	</div>
)
