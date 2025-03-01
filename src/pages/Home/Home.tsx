import { icons } from '@/assets'
import { BannerSection } from '@/components/BannerSection/BannerSection'
import { GameGrid } from '@/components/GameGrid/GameGrid'
import { HomeBanner } from '@/components/HomeBanner/HomeBanner'
import { RecentBigWins } from '@/components/RecentBigWins/RecentBigWins'
import { TableHome } from '@/components/TableHome/TableHome'
import { Button, Tabs } from '@/components/ui'
import { useAuth } from '@/Context/AuthProvider'
import { useEffect, useState } from 'react'
import s from './Home.module.scss'
import casinoBanner from '/casino banner.jpeg'
import cardImage from '/public/container game (6).jpeg'
import sportBanner from '/sport banner.jpeg'

const GAME_ITEMS_COUNT = 14

type BannerText = {
	title: string
	description: string
}

const loadFromLocalStorage = (key: string, defaultValue: string): string => {
	const storedValue = localStorage.getItem(key)
	return storedValue ? JSON.parse(storedValue) : defaultValue
}

const saveToLocalStorage = (key: string, value: string): void => {
	localStorage.setItem(key, JSON.stringify(value))
}

export const Home = () => {
	const [isTab, setTab] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY'>('DAILY')
	const { toggleAuth, isAuthenticated } = useAuth()
	const [showModal, setShowModal] = useState<boolean>(false)
	const [editingField, setEditingField] = useState<keyof BannerText | null>(
		null
	)
	const [bannerText, setBannerText] = useState<BannerText>(() => ({
		title: loadFromLocalStorage(
			'bannerTitle',
			'100 Free Spins plus a $500 Bonus!'
		),
		description: loadFromLocalStorage(
			'bannerDescription',
			'Spin the reels and win big today'
		),
	}))
	const [tempText, setTempText] = useState<string>('')

	useEffect(() => {
		saveToLocalStorage('bannerTitle', bannerText.title)
		saveToLocalStorage('bannerDescription', bannerText.description)
	}, [bannerText])

	const openModal = (field: keyof BannerText): void => {
		setEditingField(field)
		setTempText(bannerText[field])
		setShowModal(true)
	}

	const closeModal = (): void => {
		setShowModal(false)
		setEditingField(null)
	}

	const handleSave = (): void => {
		if (editingField) {
			setBannerText(prev => ({ ...prev, [editingField]: tempText }))
		}
		closeModal()
	}

	const renderTextWithEllipsis = (text: string, maxLength: number): string => {
		return text.length < maxLength ? text : `${text.substring(0, maxLength)}...`
	}

	const renderBannerText = (field: keyof BannerText, maxLength: number) => (
		<div className={s.bannerChange}>
			<span>{renderTextWithEllipsis(bannerText[field], maxLength)}</span>
			<Button type='text' onClick={() => openModal(field)}>
				<img src={icons.changeFiles} alt='changeFiles' />
			</Button>
		</div>
	)

	return (
		<div className={s.home}>
			{showModal && editingField && (
				<div className={s.changeBannerModal}>
					<textarea
						value={tempText}
						onChange={e => setTempText(e.target.value)}
						rows={2}
						style={{ width: '100%', resize: 'vertical' }}
					/>
					<Button onClick={handleSave}>Save</Button>
				</div>
			)}

			<BannerSection
				title={renderBannerText('title', 35)}
				description={renderBannerText('description', 40)}
				image={icons.banner4}
				buttonText={!isAuthenticated ? 'LOG IN' : 'DEPOSIT'}
				onButtonClick={toggleAuth}
				newClass={s.bannerBlock}
			/>

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
						onClick={setTab}
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
	)
}
