import { Button } from '@/components/ui'
import { useEditContext } from '@/Context/EditProvider'
import s from './EditModal.module.scss'

export const EditModal = () => {
	const {
		tempText,
		setTempText,
		handleSave,
	} = useEditContext()

	return (
		<div className={s.changeBannerModal}>
			<textarea
				value={tempText}
				onChange={e => setTempText(e.target.value)}
				rows={2}
				style={{ width: '100%', resize: 'vertical' }}
			/>
			<Button onClick={handleSave}>Save</Button>
		</div>
	)
}
