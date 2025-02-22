import { icons } from '@/assets'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui'
import s from './GameGrid.module.scss'

interface GameGridProps {
	gamesCount: number
	imageSrc: string
}

export const GameGrid = ({ gamesCount, imageSrc }: GameGridProps) => {
	const navigation = useNavigate()
	return (
		<>
			<div className={s.contGame}>
				{Array.from({ length: gamesCount }, (_, index) => (
					<div
						key={index}
						className={s.image}
						style={{
							backgroundImage: `url(${imageSrc})`,
						}}
					>
						<Button type='icon' newClass={s.icon}>
							<img src={icons.star} alt='star' />
						</Button>

						<div className={s.btn} onClick={e => e.stopPropagation()}>
							<Button
								type='default'
								onClick={() => navigation(`/slots/${index}`)}
							>
								PLAY
							</Button>
							<Button
								type='disabled'
								onClick={() => navigation(`/slots/${index}`)}
							>
								DEMO
							</Button>
						</div>
					</div>
				))}
			</div>
			<div className={s.footer}>
				<Button type='default' onClick={() => navigation('/slots')}>
					SHOW MORE
				</Button>
				<p>Showe 9 out of 56 promotions</p>
			</div>
		</>
	)
}
