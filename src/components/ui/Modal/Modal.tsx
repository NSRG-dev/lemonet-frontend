import React, { useEffect, useState } from 'react'
import s from './Modal.module.scss'

interface ModalProps {
	children: React.ReactNode
	className?: string
	isOpen?: boolean
}

export const Modal = ({ children, className, isOpen }: ModalProps) => {
	const [isVisible, setIsVisible] = useState(false)
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		if (isOpen) {
			setIsMounted(true)
			setTimeout(() => setIsVisible(true), 10)
		} else {
			setIsVisible(false)
			setTimeout(() => setIsMounted(false), 300)
		}
	}, [isOpen])

	if (!isMounted) return null

	return (
		<div className={`${s.modal} ${isVisible ? s.open : ''}`}>
			<div className={`${s.content} ${className}`}>{children}</div>
		</div>
	)
}
