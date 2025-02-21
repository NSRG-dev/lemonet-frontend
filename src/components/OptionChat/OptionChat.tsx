import { icons } from '@/assets'
import s from './OptionChat.module.scss'

interface OptionChatProps {
	onMute?: () => void
	onDelete?: () => void
	onPin?: () => void
	isOpenOption: boolean
}

export const OptionChat = ({
	isOpenOption,
	onMute,
	onDelete,
	onPin,
}: OptionChatProps) => {
	return (
		<div className={`${s.option} ${isOpenOption ? s.open : ''}`}>
			<ul>
				<li onClick={onMute}>
					<img src={icons.sound} alt='sound' />
					Mute
				</li>
				<li onClick={onPin}>
					<img src={icons.pin} alt='pin' />
					Pin
				</li>
				<li onClick={onDelete}>
					<img src={icons.bucket} alt='bucket' />
					Delete
				</li>
			</ul>
		</div>
	)
}
