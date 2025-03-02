import classNames from 'classnames'
import React from 'react'
import { Button } from '../ui'
import s from './BannerSection.module.scss'

interface BannerSectionProps {
	title: React.ReactNode
	description: React.ReactNode
	image: string
	newClass?: string
	buttonText?: string
	onButtonClick?: () => void
	children?: React.ReactNode
	imgClass?: string
}

export const BannerSection = ({
	title,
	description,
	image,
	newClass,
	buttonText,
	onButtonClick,
	children,
	imgClass,
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
			<img src={image} alt='banner' className={classNames(s.img, imgClass)} />
		</div>
	)
}
