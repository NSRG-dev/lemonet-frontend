import { Button } from '../ui'
import s from './GameGrid.module.scss'

interface GameGridProps {
	gamesCount: number
	imageSrc: string
	altText: string
}

export const GameGrid = ({ gamesCount, imageSrc, altText }: GameGridProps) => {
	return (
		<>
			<div className={s.contGame}>
				{Array.from({ length: gamesCount }, (_, index) => (
					<img key={index} src={imageSrc} alt={altText} />
				))}
			</div>
			<div className={s.footer}>
				<Button type='default'>SHOW MORE</Button>
				<p>Showe 9 out of 56 promotions</p>
			</div>
		</>
	)
}
