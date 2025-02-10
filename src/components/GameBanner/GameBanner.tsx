import s from './GameBanner.module.scss'

interface GameBannerProps {
	iconSrc: string
	alt: string
	label: string
}

export const GameBanner = ({ iconSrc, alt, label }: GameBannerProps) => (
	<div className={s.game}>
		<img src={iconSrc} alt={alt} />
		<span>{label}</span>
	</div>
)
