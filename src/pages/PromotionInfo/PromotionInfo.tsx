import { Linkback } from '@/components/LinkBack/Linkback'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import s from './PromotionInfo.module.scss'

interface IPromotionInfo {
	title: string
	image: string
	content: string
}

export const PromotionInfo = () => {
	const [promotion, setPromotion] = useState<IPromotionInfo | null>(null)
	const { id } = useParams()

	useEffect(() => {
		const getPromotion = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/api/promotions/${id}`
				)
				console.log('Server response:', response.data)
				setPromotion(response.data)
			} catch (error) {
				console.error('Error fetching promotion:', error)
			}
		}

		getPromotion()
	}, [id])

	if (!promotion) {
		return <div className={s.loading}>Loading...</div>
	}

	return (
		<div className={s.promotionInfo}>
			<Linkback />
			<h2>{promotion.title}</h2>
			<div className={s.card}>
				<div className={s.cardInfo}>
					<img src={promotion.image || '/image 13.png'} alt='Image game' />
					<div className={s.description}>
						<h2>Text content</h2>
						<p>{promotion.content}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
