import classNames from 'classnames'
import s from './Tabs.module.scss'

interface ITabs {
	tabs: string[]
	isTab?: string
	onClick: (value: string) => void
	newClass?: string
	type?: 'default' | 'sidebar'
}

export const Tabs = ({
	tabs,
	onClick,
	isTab,
	newClass,
	type = 'default',
}: ITabs) => {
	const className = classNames(newClass, {
		[s.tabs]: type === 'default',
		[s.sidebar]: type === 'sidebar',
	})

	return (
		<div className={className}>
			<ul>
				{tabs.map(tab => (
					<li
						key={tab}
						onClick={() => onClick(tab)}
						className={isTab === tab ? s.active : ''}
					>
						{tab}
					</li>
				))}
			</ul>
		</div>
	)
}
