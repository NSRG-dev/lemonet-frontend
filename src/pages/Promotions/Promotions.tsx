import { searchPromotions } from '@/api/promotion'
import { IPromotion } from '@/api/promotion/types'
import { icons } from '@/assets'
import { Linkback } from '@/components/LinkBack/Linkback'

import { ModalContentEditor } from '@/components/ModalContentEditor/ModalContentEditor'
import { PromotionCard } from '@/components/PromotionCard/PromotionCard'
import { Button, Input } from '@/components/ui'
import { useEffect, useState } from 'react'
import s from './Promotions.module.scss'

export const Promotions = () => {
	const [promotions, setPromotions] = useState<IPromotion[]>([])
	const [searchQuery, setSearchQuery] = useState('')
	const [isOpenModal, setOpenModal] = useState(false)
	const [content, setContent] = useState('')
	const [title, setTitle] = useState('')
	const [mediaId, setMediaId] = useState<File | null>(null)

	const fetchPromotions = async (filters = {}) => {
		try {
			const data = await searchPromotions(searchQuery, filters)
			const formattedPromotions = data.map(item => ({
				id: item.id,
				title: item.title,
				content: item.content,
				mediaId: item.mediaId || '/public/image 13.png',
			}))

			setPromotions(formattedPromotions)
		} catch (error) {
			console.error('Error fetching promotions:', error)
		}
	}

	useEffect(() => {
		fetchPromotions()
	}, [])

	const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = event => {
		event.preventDefault()
		fetchPromotions({ title: searchQuery, content: searchQuery })
	}

	const handleCreatePromotion = () => {
		const token = localStorage.getItem('token')
		if (!token) {
			alert('Пожалуйста, авторизуйтесь для создания промоакции.')
		} else {
			setOpenModal(true)
		}
	}

	const handleDeletePromotion = async (id: string) => {
		// await deletePromotion(id)
		setPromotions(promotions.filter(promotion => promotion.id !== id))
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setMediaId(e.target.files[0])
		}
	}

	const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		try {
			if (!title || !content) {
				alert('Title and content are required.')
				return
			}

			const newPromotion = {
				id: Date.now().toString(),
				title,
				content,
				mediaId: mediaId
					? URL.createObjectURL(mediaId)
					: '/public/image 13.png',
			}

			// const newPromotion = await createPromotion(title, content, mediaId)
			console.log('Promotion created successfully', newPromotion)

			if (typeof setPromotions === 'function') {
				setPromotions(prevPromotions => [...prevPromotions, newPromotion])
			} else {
				console.error('setPromotions is not a function')
			}

			setOpenModal(false)
		} catch (error) {
			console.error('Error creating promotion:', error)
			alert(
				'Ошибка при создании промоакции. Проверьте данные и попробуйте снова.'
			)
		}
	}

	return (
		<>
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
					{promotions
						.filter(promotion => promotion)
						.map((promotion, index) => (
							<PromotionCard
								key={index}
								promotion={promotion}
								handleDeletePromotion={handleDeletePromotion}
							/>
						))}
					<Button type='default' onClick={handleCreatePromotion}>
						Create promotion
					</Button>
				</div>
			</div>

			<ModalContentEditor
				modalTitle='Promotion'
				modalSubTitle='Create promotion'
				isOpenModal={isOpenModal}
				setOpenModal={setOpenModal}
				content={content}
				title={title}
				setContent={setContent}
				setTitle={setTitle}
				handleFileChange={handleFileChange}
				handleSave={handleSave}
				showFileUpload={true}
			/>
		</>
	)
}
