import { createBanner, deleteBanner, getBanner } from '@/api/banner'
import { IBanner } from '@/api/banner/types'
import { getCurrentUser } from '@/api/chat'
import { IUser } from '@/api/chat/types'
import { uploadMedia } from '@/api/promotion'
import { icons } from '@/assets'
import { BannerSection } from '@/components/BannerSection/BannerSection'
import { EditableBannerText } from '@/components/EditableBannerText/EditableBannerText'
import { GameGrid } from '@/components/GameGrid/GameGrid'
import { HomeBanner } from '@/components/HomeBanner/HomeBanner'
import { ModalContentEditor } from '@/components/ModalContentEditor/ModalContentEditor'
import { RecentBigWins } from '@/components/RecentBigWins/RecentBigWins'
import { TableHome } from '@/components/TableHome/TableHome'
import { Button, Tabs } from '@/components/ui'
import { useAuth } from '@/Context/AuthProvider'
import { useEditContext } from '@/Context/EditProvider'
import { useEffect, useState } from 'react'
import s from './Home.module.scss'
import casinoBanner from '/casino banner.jpeg'
import cardImage from '/public/container game (6).jpeg'
import sportBanner from '/sport banner.jpeg'

const GAME_ITEMS_COUNT = 14
export const Home = () => {
	const [isTab, setTab] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY'>('DAILY')
	const { banners } = useEditContext()
	const { isAuthenticated, toggleAuth, toggleDeposit } = useAuth()
	const [isOpenModal, setOpenModal] = useState(false)
	const [content, setContent] = useState('')
	const [title, setTitle] = useState('')
	const [mediaFile, setMediaFile] = useState<File | null>(null)
	const [banner, setBanner] = useState<IBanner[]>([])
	const [user, setUser] = useState<IUser | null>(null)

	useEffect(() => {
		getBanner()
	}, [])

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

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setMediaFile(e.target.files[0])
		}
	}

	const handleCreatePromotion = () => {
		const token = localStorage.getItem('token')
		if (!token) {
			alert('Пожалуйста, авторизуйтесь для создания промоакции.')
		} else {
			setOpenModal(true)
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
				const mediaResponse = await uploadMedia(mediaFile, 'BANNER')
				uploadedMedia = {
					id: mediaResponse.id,
					url: mediaResponse.url,
					type: 'PROMOTION',
				}
			}

			const newBanner = await createBanner(title, content, uploadedMedia?.id)
			console.log('Promotion created successfully', newBanner)

			if (!newBanner.id || !newBanner.title || !newBanner.content) {
				throw new Error('Неверный формат данных от сервера')
			}

			setBanner(prevBanner => [
				...prevBanner,
				{
					...newBanner,
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

	const handleDeleteBanner = async (id: string) => {
		await deleteBanner(id)
		setBanner(banner.filter(promotion => promotion.id !== id))
	}

	return (
		<>
			<div className={s.home}>
				<BannerSection
					title={
						<EditableBannerText
							text={banners.home.title}
							field='title'
							bannerKey='home'
							maxLength={35}
						/>
					}
					description={
						<EditableBannerText
							text={banners.home.description}
							field='description'
							bannerKey='home'
							maxLength={40}
						/>
					}
					image={icons.banner4}
					buttonText={!isAuthenticated ? 'LOG IN' : 'DEPOSIT'}
					onButtonClick={!isAuthenticated ? toggleAuth : toggleDeposit}
					newClass={s.bannerBlock}
				/>

				<div className={s.creatingBanner}>
					<div className={s.banner}>
						<HomeBanner
							description='Step into our exclusive games, experience live action, and hit the slots for massive wins'
							buttonText='GO TO CASINO'
							image={casinoBanner}
						/>
						<HomeBanner
							description='Place your bets on Football, NBA, UFC, eSports & explore over 100 sporting events'
							buttonText='GO TO SPORT'
							image={sportBanner}
						/>
						{banner.map(banner => (
							<HomeBanner
								key={banner.id}
								description={banner.content}
								buttonText='GO TO SPORT'
								image={banner.mediaId}
								deleteBanner={() => handleDeleteBanner(banner.id)}
								role={user?.role.name}
							/>
						))}
					</div>
					{user?.role.name === 'admin' && (
						<Button type='default' onClick={handleCreatePromotion}>
							Create Banner
						</Button>
					)}
				</div>

				<RecentBigWins />

				<div className={s.games}>
					<h3>
						<img src={icons.slots} alt='slots' />
						Top games
					</h3>
					<GameGrid gamesCount={GAME_ITEMS_COUNT} imageSrc={cardImage} />
				</div>

				<div className={s.table}>
					<div className={s.header}>
						<h3>
							<img src={icons.trophy} alt='trophy' />
							Leaderboards
						</h3>
						<Tabs
							isTab={isTab}
							onClick={(value: string) =>
								setTab(value as 'DAILY' | 'WEEKLY' | 'MONTHLY')
							}
							tabs={['DAILY', 'WEEKLY', 'MONTHLY']}
						/>
					</div>

					<div className={s.tables}>
						<div className={s.tableRow}>
							{['USERS', 'GAME', 'TIME', 'BET', 'X', 'PROFIT'].map(
								(row, index) => (
									<div className={s.cell} key={index}>
										<span>{row}</span>
									</div>
								)
							)}
						</div>
						{Array.from({ length: 6 }, (_, index) => (
							<TableHome
								key={index}
								user='@MegaJackpot'
								date='17/02/2025'
								time='12:35'
								deposit={`100 490`}
								profit={`100 490`}
							/>
						))}
					</div>
				</div>
			</div>

			<ModalContentEditor
				modalTitle='Banner'
				modalSubTitle='Create banner'
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
