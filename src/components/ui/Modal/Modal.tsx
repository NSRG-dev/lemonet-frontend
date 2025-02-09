import React from 'react'
import s from './Modal.module.scss'

interface ModalProps {
	children: React.ReactNode
	className?: string
}

export const Modal = ({ children, className }: ModalProps) => {
	return (
		<div className={s.modal}>
			<div className={`${s.content} ${className}`}>{children}</div>
		</div>
	)
}
