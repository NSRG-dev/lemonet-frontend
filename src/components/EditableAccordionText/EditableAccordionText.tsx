import { icons } from '@/assets'
import { Button } from '@/components/ui'
import { useEditContext } from '@/Context/EditProvider'
import s from './EditableAccordionText.module.scss'

interface EditableAccordionTextProps {
	text: string
	field: 'title' | 'description'
	accordionKey: string
	maxLength?: number
}

export const EditableAccordionText = ({
	text,
	field,
	accordionKey,
	maxLength = 35,
}: EditableAccordionTextProps) => {
	const { openModal } = useEditContext()

	const displayText =
		text.length > maxLength ? `${text.substring(0, maxLength)}...` : text

	return (
		<div className={s.accordionChange}>
			<span>{displayText}</span>
			<Button
				type='text'
				onClick={e => {
					e.stopPropagation()
					openModal(accordionKey as any, field)
				}}
			>
				<img src={icons.changeFiles} alt='Edit' />
			</Button>
		</div>
	)
}
