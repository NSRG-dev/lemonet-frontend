import { icons } from '@/assets'
import { Button } from '@/components/ui'
import { useEditContext } from '@/Context/EditProvider'
import s from './EditableBannerText.module.scss'

interface EditableBannerTextProps {
	text: string
	field: 'title' | 'description'
	bannerKey: 'home' | 'profile' | 'referral' | 'affiliates' | 'vip'
	maxLength?: number
}

export const EditableBannerText = ({
	text,
	field,
	bannerKey,
	maxLength = 35,
}: EditableBannerTextProps) => {
	const { openModal } = useEditContext()

	const displayText =
		text.length > maxLength ? `${text.substring(0, maxLength)}...` : text

	return (
		<div className={s.bannerChange}>
			<span>{displayText}</span>
			<Button type='text' onClick={() => openModal(bannerKey, field)}>
				<img src={icons.changeFiles} alt='Edit' />
			</Button>
		</div>
	)
}
