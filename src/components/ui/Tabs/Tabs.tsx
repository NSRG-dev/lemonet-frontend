import s from './Tabs.module.scss'

interface ITabs {
	tabs: string[]
	isTab?: string
	onClick: (value: string) => void
}

export const Tabs = ({ tabs, onClick, isTab }: ITabs) => {
	return (
		<div className={s.tabs}>
			{tabs.map(tab => (
				<button
					key={tab}
					onClick={() => onClick(tab)}
					style={{
						backgroundColor:
							isTab === tab ? 'rgb(158, 217, 39)' : 'transparent',
						color: isTab === tab ? 'rgb(20, 40, 0)' : ' rgb(104, 108, 123)',
					}}
				>
					{tab}
				</button>
			))}
		</div>
	)
}
