import { getSlots } from '@/api/slots'
import { icons } from '@/assets'
import { useAuth } from '@/Context/AuthProvider'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui'
import s from './GameGrid.module.scss'

interface GameGridProps {
	gamesCount: number
	imageSrc: string
}

export const GameGrid = ({ gamesCount = 9, imageSrc }: GameGridProps) => {
	const navigation = useNavigate()
	const { toggleAuth, isAuthenticated } = useAuth()
	const [slots, setSlots] = useState<any[]>([])
	const [page, setPage] = useState(1)
	const [totalSlots, setTotalSlots] = useState(0)

	useEffect(() => {
		const loadSlots = async () => {
			try {
				const data = await getSlots(page, 9)
				setSlots(data.slots)
				setTotalSlots(data.total)
			} catch (error) {
				console.error('Ошибка при загрузке слотов:', error)
			}
		}
		loadSlots()
	}, [page])

	const handleShowMore = () => {
		setPage(prev => prev + 1)
	}

	const displayItems =
		slots.length > 0
			? slots
			: Array.from({ length: gamesCount }, (_, index) => ({ id: index }))

	return (
		<>
			<div className={s.contGame}>
				{displayItems.map(item => (
					<div
						key={item.id}
						className={s.image}
						style={{
							backgroundImage: `url(${item.imageUrl || imageSrc})`,
						}}
					>
						<Button type='icon' newClass={s.icon}>
							<img src={icons.star} alt='star' />
						</Button>

						<div className={s.btn} onClick={e => e.stopPropagation()}>
							<Button
								type='default'
								onClick={() => {
									!isAuthenticated
										? toggleAuth()
										: navigation(`/slots/${item.id}`)
								}}
							>
								PLAY
							</Button>
							<Button
								type='disabled'
								onClick={() => {
									!isAuthenticated
										? toggleAuth()
										: navigation(`/slots/${item.id}`)
								}}
							>
								DEMO
							</Button>
						</div>
					</div>
				))}
			</div>
			<div className={s.footer}>
				{slots.length > 0 && (
					<>
						<Button type='default' onClick={handleShowMore}>
							SHOW MORE
						</Button>
						<p>
							Showing {slots.length} out of {totalSlots} slots
						</p>
					</>
				)}
			</div>
		</>
	)
}
