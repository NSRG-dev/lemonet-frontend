import { icons } from '@/assets'
import { Linkback } from '@/components/LinkBack/Linkback'
import { PromotionCard } from '@/components/PromotionCard/PromotionCard'
import { Input } from '@/components/ui'
import axios from 'axios'
import { useEffect, useState } from 'react'
import s from './Promotions.module.scss'

export const Promotions = () => {
	const [promotions, setPromotions] = useState([])
	const [searchQuery, setSearchQuery] = useState('')

	const fetchPromotions = async (filters = {}) => {
		try {
			const response = await axios.post(
				'http://localhost:3000/api/promotions/search',
				{
					pagination: {
						count: 10,
						page: 1,
					},
					filters: {
						title: searchQuery,
						content: searchQuery,
						...filters,
					},
					sorts: {},
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			console.log('Server response:', response.data)
			setPromotions(response.data.data)
		} catch (error) {
			console.error('Error fetching promotions:', error)
		}
	}

	useEffect(() => {
		fetchPromotions()
	}, [])

	if (!promotions) {
		return <div className={s.loading}>Loading</div>
	}

	const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = event => {
		event.preventDefault()
		fetchPromotions({ title: searchQuery, content: searchQuery })
	}

	return (
		<div className={s.promotions}>
			<Linkback />
			<h2>
				<img src={icons.promotions} alt='promotions' />
				Promotions
			</h2>
			<form className={s.search} onSubmit={handleSearchSubmit}>
				<Input
					placeholder='Search for game'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					open
				/>
			</form>
			<div className={s.grid}>
				{Array.isArray(promotions) && promotions.length > 0 ? (
					promotions.map((promotion, index) => (
						<PromotionCard key={index} promotion={promotion} />
					))
				) : (
					<p className={s.notfoundpr}>No promotions found.</p>
				)}
			</div>
		</div>
	)
}
