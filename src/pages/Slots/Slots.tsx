import { icons } from '@/assets'
import { RecentBigWins } from '@/components/RecentBigWins/RecentBigWins'
import { Button, Input } from '@/components/ui'
import { Link } from 'react-router-dom'
import s from './Slots.module.scss'

// Константы для повторяющихся значений
const RECENT_WINS_COUNT = 16
const GAME_ITEMS_COUNT = 8
const SORT_ITEMS = Array(9).fill('Slots')

export const Slots = () => {
	return (
		<div className={s.slots}>
			<Link to={'/'} className={s.backLink}>
				<Button type='icon'>
					<img
						src={icons.arrow}
						alt='arrow'
						style={{ transform: 'rotate(-90deg)' }}
					/>
				</Button>
				Back to home page
			</Link>
			<h2>
				<img src={icons.slots} alt='slots' />
				Slots
			</h2>

			<RecentBigWins array={RECENT_WINS_COUNT} />

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

			<div className={s.contGame}>
				{Array.from({ length: GAME_ITEMS_COUNT }, (_, index) => (
					<img key={index} src='/public/container game (6).jpeg' alt='game' />
				))}
			</div>

			<div className={s.footer}>
				<Button type='default'>SHOW MORE</Button>
				<p>Showe 9 out of 56 promotions</p>
			</div>
		</div>
	)
}
