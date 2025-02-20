import { icons } from '@/assets'
import { GameGrid } from '@/components/GameGrid/GameGrid'
import { Linkback } from '@/components/LinkBack/Linkback'
import { RecentBigWins } from '@/components/RecentBigWins/RecentBigWins'
import { Input } from '@/components/ui'
import s from './Slots.module.scss'

const GAME_ITEMS_COUNT = 28
const SORT_ITEMS = Array(9).fill('Slots')

export const Slots = () => {
	return (
		<div className={s.slots}>
			<Linkback />
			<h2>
				<img src={icons.slots} alt='slots' />
				Slots
			</h2>
			<RecentBigWins />
			<div className={s.search}>
				<Input placeholder='Search for game' open />
			</div>
			<div className={s.sort}>
				<ul>
					{SORT_ITEMS.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</div>
			<GameGrid
				gamesCount={GAME_ITEMS_COUNT}
				imageSrc='/public/container game (6).jpeg'
				altText='game'
			/>
		</div>
	)
}
