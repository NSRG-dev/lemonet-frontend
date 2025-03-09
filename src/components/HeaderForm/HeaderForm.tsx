import close from '@/assets/close.svg'
import React from 'react'
import { Button } from '../ui'
import s from './HeaderForm.module.scss'

interface IHeaderForm {
	title: string
	subtitle: string
	onClose?: (valye: React.MouseEvent<HTMLButtonElement>) => void
}

export const HeaderForm = ({ title, subtitle, onClose }: IHeaderForm) => {
	return (
		<div className={s.header}>
			<div className={s.left}>
				<h2>{title}</h2>
				<p>{subtitle}</p>
			</div>
			<Button type='icon' onClick={onClose}>
				<img src={close} alt='close' loading='lazy' />
			</Button>
		</div>
	)
}
