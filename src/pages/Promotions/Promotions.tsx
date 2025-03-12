import { getCurrentUser } from '@/api/chat'
import { IUser } from '@/api/chat/types'
import {
	createPromotion,
	deletePromotion,
	searchPromotions,
	uploadMedia,
} from '@/api/promotion'
import { IPromotion } from '@/api/promotion/types'
import { icons } from '@/assets'
import { Linkback } from '@/components/LinkBack/Linkback'
import { ModalContentEditor } from '@/components/ModalContentEditor/ModalContentEditor'
import { PromotionCard } from '@/components/PromotionCard/PromotionCard'
import { Button, Input } from '@/components/ui'
import { useAuth } from '@/Context/AuthProvider'
import { useEffect, useState } from 'react'
import s from './Promotions.module.scss'

export const Promotions = () => {
	const [promotions, setPromotions] = useState<IPromotion[]>([])
	const [searchQuery, setSearchQuery] = useState('')
	const [isOpenModal, setOpenModal] = useState(false)
	const [content, setContent] = useState('')
	const [title, setTitle] = useState('')
	const [mediaFile, setMediaFile] = useState<File | null>(null)
	const [user, setUser] = useState<IUser | null>(null)
	const { isAuthenticated } = useAuth()

	useEffect(() => {
		if (isAuthenticated) {
			getCurrentUser()
				.then(response => {
					console.log('Server response:', response)
					setUser(response)
				})
				.catch(error =>
					console.error('Ошибка загрузки данных пользователя:', error)
				)
		}
	}, [isAuthenticated])

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
		await deletePromotion(id)
		setPromotions(promotions.filter(promotion => promotion.id !== id))
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setMediaFile(e.target.files[0])
		}
	}

	const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		try {
			if (!title || !content) {
				alert('Title and content are required.')
				return
			}

			let uploadedMedia = null
			if (mediaFile) {
				const mediaResponse = await uploadMedia(mediaFile, 'PROMOTION')
				uploadedMedia = {
					id: mediaResponse.id,
					url: mediaResponse.url,
					type: 'PROMOTION',
				}
			}

			const newPromotion = await createPromotion(
				title,
				content,
				uploadedMedia?.id
			)
			console.log('Promotion created successfully', newPromotion)

			if (!newPromotion.id || !newPromotion.title || !newPromotion.content) {
				throw new Error('Неверный формат данных от сервера')
			}

			setPromotions(prevPromotions => [
				...prevPromotions,
				{
					...newPromotion,
					media: uploadedMedia,
				},
			])

			setOpenModal(false)
			setTitle('')
			setContent('')
			setMediaFile(null)
		} catch (error) {
			console.error('Error creating promotion:', error)
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
						.map(promotion => (
							<PromotionCard
								key={promotion.id}
								promotion={promotion}
								handleDeletePromotion={handleDeletePromotion}
								role={user?.role.name}
							/>
						))}
					{user?.role.name === 'admin' && (
						<Button type='default' onClick={handleCreatePromotion}>
							Create promotion
						</Button>
					)}
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
