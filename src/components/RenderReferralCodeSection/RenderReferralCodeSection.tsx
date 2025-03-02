import { icons } from '@/assets'
import { Input } from '../ui'
import s from './RenderReferralCodeSection.module.scss'

interface RenderReferralCodeSectionProps {
	setOpenCode: React.Dispatch<React.SetStateAction<boolean>>
	isOpenCode: boolean
	referralCode: string
	setReferralCode: (value: string) => void
}

export const RenderReferralCodeSection = ({
	setOpenCode,
	isOpenCode,
	referralCode,
	setReferralCode,
}: RenderReferralCodeSectionProps) => (
	<div className={s.tab}>
		<div className={s.label} onClick={() => setOpenCode(prev => !prev)}>
			<span>
				<img src={icons.code} alt='code' loading='lazy' />
				Do you have code?
			</span>
			<button>
				<img
					src={icons.arrow}
					alt='arrow'
					className={isOpenCode ? s.rotated : ''}
				/>
			</button>
		</div>
		<div className={`${s.input} ${isOpenCode ? s.open : ''}`}>
			<Input
				open
				placeholder='Enter referral code'
				value={referralCode}
				onChange={e => setReferralCode(e.target.value)}
			/>
		</div>
	</div>
)
