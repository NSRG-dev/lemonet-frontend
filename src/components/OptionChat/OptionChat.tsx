import { icons } from '@/assets'
import s from './OptionChat.module.scss'

export const OptionChat = ({ isOpenOption }: { isOpenOption: boolean }) => {
	return (
		<div className={`${s.option} ${isOpenOption ? s.open : ''}`}>
			<ul>
				<li>
					<img src={icons.sound} alt='sound' />
					Mute
				</li>
				<li>
					<img src={icons.pin} alt='pin' />
					Pin
				</li>
				<li>
					<img src={icons.bucket} alt='bucket' />
					Delete
				</li>
			</ul>
		</div>
	)
}
