import { icons } from '@/assets'
import { FormBlock } from '@/components/FormBlock/FormBlock'
import { ProfileInfo } from '@/components/ProfileInfo/ProfileInfo'
import { ReferralSystem } from '@/components/ReferralSystem/ReferralSystem'
import { SumCounter } from '@/components/SumCounter/SumCounter'
import { Tabs } from '@/components/ui'
import { useCallback, useState } from 'react'
import s from './Profile.module.scss'

export const Profile = () => {
	const [isTab, setTab] = useState('Personal information')
	const [isTabs, setTabs] = useState('DAILY')

	const renderForms = useCallback(
		() => ['form1', 'form2'].map(key => <FormBlock key={key} />),
		[]
	)

	return (
		<div className={s.profile}>
			<div className={s.left}>
				<ProfileInfo />
				<SumCounter />
				<Tabs
					type='sidebar'
					isTab={isTab}
					onClick={setTab}
					tabs={['Personal information', 'Referal system']}
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
			</div>
		</div>
	)
}
