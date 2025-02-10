import { GameControls } from '@/components/GameControls/GameControls'
import { GameGrid } from '@/components/GameGrid/GameGrid'
import { Linkback } from '@/components/LinkBack/Linkback'
import { RecentBigWins } from '@/components/RecentBigWins/RecentBigWins'
import { useState } from 'react'
import s from './SlotGame.module.scss'

const GAME_ITEMS_COUNT = 8

export const SlotGame = () => {
	const [isTab, setTab] = useState('play')

	return (
		<div className={s.slotGame}>
			<Linkback />
			<h2>Carnival Cat</h2>
			<div className={s.gamePlay}>
				<GameControls isTab={isTab} setTab={setTab} array={['play', 'demo']} />
			</div>
			<RecentBigWins />
			<div className={s.gameList}>
				<h4>Top games</h4>
				<GameGrid
					gamesCount={GAME_ITEMS_COUNT}
					imageSrc='/public/container game (6).jpeg'
					altText='game'
				/>
			</div>
		</div>
	)
}
