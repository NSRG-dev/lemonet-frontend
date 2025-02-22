import { icons } from '@/assets'
import { Input } from '../ui'
import s from './RenderReferralCodeSection.module.scss'

interface RenderReferralCodeSectionProps {
	setOpenCode: React.Dispatch<React.SetStateAction<boolean>>
	isOpenCode: boolean
}

export const RenderReferralCodeSection = ({
	setOpenCode,
	isOpenCode,
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
				label='Your password'
				placeholder='Enter referral code'
				open={true}
			/>
		</div>
	</div>
)
