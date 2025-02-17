import classNames from 'classnames'
import React from 'react'
import s from './BannerSection.module.scss'
import { Button } from '../ui'

interface BannerSectionProps {
	title: string
	description: string
	image: string
	newClass?: string
	buttonText?: string
	onButtonClick?: () => void
	children?: React.ReactNode
}

export const BannerSection = ({
	title,
	description,
	image,
	newClass,
	buttonText,
	onButtonClick,
	children,
}: BannerSectionProps) => {
	return (
		<div className={classNames(s.banner, newClass)}>
			<div className={s.descr}>
				<div className={s.text}>
					<h1>{title}</h1>
					<p>{description}</p>
				</div>
				{buttonText && (
					<Button type='default' onClick={onButtonClick}>
						{buttonText}
					</Button>
				)}
				{children}
			</div>
			<img src={image} alt='banner' className={s.img} />
		</div>
	)
}
