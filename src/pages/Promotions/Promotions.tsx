import { icons } from '@/assets'
import { Linkback } from '@/components/LinkBack/Linkback'
import { PromotionCard } from '@/components/PromotionCard/PromotionCard'
import { Input } from '@/components/ui'
import { useEffect, useState } from 'react'
import s from './Promotions.module.scss'

export const Promotions = () => {
	const [promotions, setPromotions] = useState([])

	useEffect(() => {
		const getPromotions = async () => {
			try {
				const response = await fetch('http://localhost:3000/promotions')
				const data = await response.json()
				setPromotions(data)
			} catch (error) {
				console.error('Error fetching promotions:', error)
			}
		}

		getPromotions()
	}, [])

	return (
		<div className={s.promotions}>
			<Linkback />
			<h2>
				<img src={icons.promotions} alt='promotions' />
				Promotions
			</h2>
			<div className={s.search}>
				<Input placeholder='Search for game' open />
			</div>
			<div className={s.grid}>
				{Array.from({ length: 10 }, (_, index) => (
					<PromotionCard key={index} index={index} />
				))}
			</div>
		</div>
	)
}
