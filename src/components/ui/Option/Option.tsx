import arrow from '@/assets/angle-down.svg'
import classNames from 'classnames'
import React, { useState } from 'react'
import s from './Option.module.scss'

interface IOption {
	title: string | React.JSX.Element
	label?: string
	options: string[]
	open?: boolean
	sx?: React.CSSProperties
	sxB?: React.CSSProperties
	newClass?: string
}

export const Option = ({
	title,
	label,
	options,
	open = false,
	sx,
	sxB,
	newClass,
}: IOption) => {
	const [isOpen, setOpen] = useState(open)

	const handleToggle = () => {
		setOpen(prev => !prev)
	}

	return (
		<div className={classNames(s.option, newClass)}>
			{label && !open && <span className={s.subtitle}>{label}</span>}
			<div className={s.block} onClick={handleToggle} style={sxB}>
				<b>{title}</b>
				<button
					aria-expanded={isOpen}
					className={s.arrowButton}
					style={{
						transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
						transition: 'transform 0.3s ease-in-out',
					}}
				>
					<img src={arrow} alt='Toggle options' loading='lazy' />
				</button>
				<div className={`${s.opt} ${isOpen ? s.open : ''}`} style={sx}>
					{options.map((opt, index) => (
						<span key={index}>{opt}</span>
					))}
				</div>
			</div>
		</div>
	)
}
