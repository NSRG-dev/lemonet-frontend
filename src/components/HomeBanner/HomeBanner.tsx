import { Button } from '../ui'
import s from './HomeBanner.module.scss'

interface HomeBannerProps {
	image: string
	description: string
	buttonText: string
}

export const HomeBanner = ({
	image,
	description,
	buttonText,
}: HomeBannerProps) => {
	return (
		<div
			className={s.banner}
			style={{
				backgroundImage: `url(${image})`,
			}}
		>
			<p>{description}</p>
			<Button type='default'>{buttonText}</Button>
		</div>
	)
}
