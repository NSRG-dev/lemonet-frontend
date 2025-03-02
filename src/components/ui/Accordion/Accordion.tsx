import { icons } from '@/assets'
import { Button } from '@/components/ui'
import React from 'react'
import s from './Accordion.module.scss'

interface AccordionProps {
	title: React.ReactNode
	isOpen: boolean
	onClick: () => void
	children: React.ReactNode
}

export const Accordion = ({
	title,
	isOpen,
	onClick,
	children,
}: AccordionProps) => {
	return (
		<div className={s.accordion}>
			<div
				className={s.accordionTitle}
				onClick={onClick}
				style={{
					borderRadius: !isOpen ? '12px' : '12px 12px 0px 0px',
				}}
			>
				<div className={s.title}>{title}</div>
				<Button type='icon' newClass={isOpen ? s.active : ''}>
					<img
						src={icons.arrow}
						alt='arrow'
						style={{
							transform: `rotate(${!isOpen ? '180deg' : '0deg'})`,
							transition: 'transform 0.3s ease',
						}}
					/>
				</Button>
			</div>
			<div className={`${s.content} ${isOpen ? s.open : ''}`}>{children}</div>
		</div>
	)
}
