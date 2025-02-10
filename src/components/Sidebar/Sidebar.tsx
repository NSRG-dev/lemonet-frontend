import { icons } from '@/assets'
import { useBurger } from '@/Context/BurgerProvider'
import { useState } from 'react'
import { GameBanner } from '../GameBanner/GameBanner'
import { NavigationColumn } from '../NavigationColumn/NavigationColumn'
import { Button } from '../ui'
import s from './Sidebar.module.scss'

export const Sidebar = () => {
	const [isColumnsOpen, setColumnsOpen] = useState([true, true])
	const { isOpenMenu, toggleMenu } = useBurger()

	const toggleColumn = (index: number) => {
		setColumnsOpen(prevState => {
			const newState = [...prevState]
			newState[index] = !newState[index]
			return newState
		})
	}

	const casinoItems = ['Favorites', 'Favorites', 'Favorites', 'Favorites']
	return (
		<div className={`${s.wind} ${!isOpenMenu ? s.open : s.closed}`}>
			<aside className={`${s.sidebar} ${!isOpenMenu ? s.open : s.closed}`}>
				<div className={s.gameBanner}>
					<GameBanner iconSrc={icons.lemonPoint} alt='game' label='Jackpot' />
					<GameBanner iconSrc={icons.lemonPoint} alt='game' label='Jackpot' />
				</div>
				<div className={s.navigation}>
					<div className={s.title}>
						<h4>
							<img src={icons.home} alt='home' />
							Home page
						</h4>

						<Button type='icon' onClick={toggleMenu}>
							<img
								src={icons.arrow}
								alt='arrow'
								style={{
									transform: 'rotate(-90deg)',
								}}
							/>
						</Button>
					</div>
					<NavigationColumn
						title='Casino'
						items={casinoItems}
						iconSrc={icons.arrow}
						alt='arrow'
						isColumn={isColumnsOpen[0]}
						setColumn={() => toggleColumn(0)}
					/>
					<NavigationColumn
						title='Casino'
						items={casinoItems}
						iconSrc={icons.arrow}
						alt='arrow'
						isColumn={isColumnsOpen[1]}
						setColumn={() => toggleColumn(1)}
					/>
					<Button type='disabled'>Buy crypto</Button>
				</div>
			</aside>
		</div>
	)
}
