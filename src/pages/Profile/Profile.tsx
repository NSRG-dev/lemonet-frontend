import { logoutUser } from '@/api/auth'
import { icons } from '@/assets'
import { BannerSection } from '@/components/BannerSection/BannerSection'
import { FormBlock } from '@/components/FormBlock/FormBlock'
import { GameHistory } from '@/components/GameHistory/GameHistory'
import { ProfileInfo } from '@/components/ProfileInfo/ProfileInfo'
import { ReferralSystem } from '@/components/ReferralSystem/ReferralSystem'
import { SumCounter } from '@/components/SumCounter/SumCounter'
import { TransactionHistory } from '@/components/TransactionHistory/TransactionHistory'
import { Tabs } from '@/components/ui'
import { useAuth } from '@/Context/AuthProvider'
import { useCallback, useState } from 'react'
import s from './Profile.module.scss'

export const Profile = () => {
	const [isTab, setTab] = useState('Personal information')
	const [isTabs, setTabs] = useState('DAILY')

	const renderForms = useCallback(
		() => ['form1', 'form2'].map(key => <FormBlock key={key} />),
		[]
	)
	const { logout } = useAuth()

	const handleLogout = async () => {
		try {
			await logoutUser(true)
			logout()
		} catch (error) {
			console.error('Ошибка при выходе:', error)
		}
	}
	return (
		<div className={s.profile}>
			<BannerSection
				title='Deposit and Claim Your Bonus'
				description='Deposit up to $100 and get 180% added to your account!'
				image={icons.banner}
				buttonText='DEPOSIT'
				onButtonClick={() => console.log('Deposit clicked')}
			/>
			<div className={s.profileContent}>
				<div className={s.left}>
					<ProfileInfo handleLogout={handleLogout} />
					<SumCounter />
					<Tabs
						type='sidebar'
						isTab={isTab}
						onClick={setTab}
						tabs={[
							'Personal information',
							'Referal system',
							'VIP program',
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
