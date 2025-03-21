import { icons } from '@/assets'
import { sidebarLinks } from '@/constant/navigation'
import { useAuth } from '@/Context/AuthProvider'
import { useBurger } from '@/Context/BurgerProvider'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavigationColumn } from '../NavigationColumn/NavigationColumn'
import { Button } from '../ui'
import s from './Sidebar.module.scss'

export const Sidebar = () => {
	const [isColumnsOpen, setColumnsOpen] = useState([true, true])
	const { isOpenMenu, toggleMenu, handleCloseMenu } = useBurger()
	const { toggleAuth } = useAuth()

	useEffect(() => {
		if (isOpenMenu) {
			document.body.classList.add('no-scroll')
		} else {
			document.body.classList.remove('no-scroll')
		}

		return () => {
			document.body.classList.remove('no-scroll')
		}
	}, [isOpenMenu])

	const toggleColumn = (index: number) => {
		setColumnsOpen(prevState => {
			const newState = [...prevState]
			newState[index] = !newState[index]
			return newState
		})
	}

	return (
		<div
			className={`${s.wind} ${isOpenMenu ? s.open : s.closed}`}
			onClick={handleCloseMenu}
		>
			<aside
				className={`${s.sidebar} ${isOpenMenu ? s.open : s.closed}`}
				onClick={e => e.stopPropagation()}
			>
				<div className={s.gameBanner}>
					<h3>Multiply your winnings – click and claim!</h3>
					<Button type='default' onClick={toggleAuth}>
						LOG IN
					</Button>
				</div>
				<div className={s.navigation}>
					<div className={s.title}>
						<Link to={'/'}>
							<img src={icons.home} alt='home' />
							Home page
						</Link>
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
					{sidebarLinks.map((link, index) => (
						<NavigationColumn
							key={index}
							title={link.title}
							items={link.links}
							iconSrc={icons.arrow}
							alt='arrow'
							isColumn={isColumnsOpen[index]}
							setColumn={() => toggleColumn(index)}
						/>
					))}
					<Button type='disabled'>Buy crypto</Button>
				</div>
			</aside>
		</div>
	)
}
