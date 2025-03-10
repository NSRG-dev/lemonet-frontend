import { getCurrentUser } from '@/api/chat'
import { IUser } from '@/api/chat/types'
import { icons } from '@/assets'
import { BannerSection } from '@/components/BannerSection/BannerSection'
import { EditableBannerText } from '@/components/EditableBannerText/EditableBannerText'
import { FormBlock } from '@/components/FormBlock/FormBlock'
import { GameHistory } from '@/components/GameHistory/GameHistory'
import { ProfileInfo } from '@/components/ProfileInfo/ProfileInfo'
import { ReferralSystem } from '@/components/ReferralSystem/ReferralSystem'
import { SumCounter } from '@/components/SumCounter/SumCounter'
import { TransactionHistory } from '@/components/TransactionHistory/TransactionHistory'
import { Tabs } from '@/components/ui'
import { useAuth } from '@/Context/AuthProvider'
import { useEditContext } from '@/Context/EditProvider'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './Profile.module.scss'

export const Profile = () => {
	const [isTab, setTab] = useState('Personal information')
	const [isTabs, setTabs] = useState('DAILY')
	const navigation = useNavigate()

	const renderForms = useCallback(
		() => ['form1', 'form2'].map(key => <FormBlock key={key} />),
		[]
	)
	const { logout, isAuthenticated } = useAuth()
	const { banners } = useEditContext()

	const handleLogout = async () => {
		logout()
		navigation('/')
	}
	const [user, setUser] = useState<IUser | null>(null)

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

	return (
		<div className={s.profile}>
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
				image={icons.banner}
				buttonText='DEPOSIT'
				onButtonClick={() => console.log('Button clicked')}
			/>

			<div className={s.profileContent}>
				<div className={s.left}>
					<ProfileInfo
						handleLogout={handleLogout}
						username={user?.username || 'Guest'}
						email={user?.email || 'No email'}
						avatarSrc={user?.avatar || icons.avatar}
						role={user?.role?.name || 'Silver'}
					/>
					<SumCounter />
					<Tabs
						type='sidebar'
						isTab={isTab}
						onClick={setTab}
						tabs={[
							'Personal information',
							'Referal system',
							'Game history',
							'Transactions history',
						]}
					/>
				</div>
				<div className={s.right}>
					<div className={s.blocks}>
						{Array.from({ length: 4 }, (_, index) => (
							<div key={index} className={s.block}>
								<span>
									<img src={icons.vect} alt='' />
								</span>
								<h3>Check loyal system</h3>
							</div>
						))}
					</div>
					{isTab === 'Personal information' && (
						<div className={s.form}>{renderForms()}</div>
					)}
					{isTab === 'Referal system' && (
						<ReferralSystem isTabs={isTabs} setTabs={setTabs} />
					)}
					{isTab === 'Game history' && (
						<GameHistory isTabs={isTabs} setTabs={setTabs} />
					)}
					{isTab === 'Transactions history' && (
						<TransactionHistory isTabs={isTabs} setTabs={setTabs} />
					)}
				</div>
			</div>
		</div>
	)
}
