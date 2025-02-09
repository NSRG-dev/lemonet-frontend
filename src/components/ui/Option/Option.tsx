import arrow from '@/assets/angle-down.svg'
import React, { useState } from 'react'
import s from './Option.module.scss'

interface IOption {
	title: string | React.JSX
	label: string
	options: string[]
}

export const Option = ({ title, label, options }: IOption) => {
	const [isOpen, setOpen] = useState(false)
	return (
		<div className={s.option}>
			<span className={s.subtitle}>{label}</span>
			<div className={s.block} onClick={() => setOpen(!isOpen)}>
				<b>{title}</b>
				<button
					style={{
						transform: !isOpen ? 'rotate(180deg)' : 'none',
						transition: 'transform 0.3s ease-in-out',
					}}
				>
					<img src={arrow} alt='arrow' loading='lazy' />
				</button>
				<div className={`${s.opt} ${isOpen ? s.open : ''}`}>
					{options.map((opt, index) => (
						<b key={index}>{opt}</b>
					))}
				</div>
			</div>
		</div>
	)
}
