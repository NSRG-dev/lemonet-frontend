import { icons } from '@/assets'
import { IChat } from '@/types/chat'
import { Button } from '../ui'
import { UserInfo } from '../UserInfo/UserInfo'
import s from './PinMessage.module.scss'

interface PinMessageProps {
	pinnedMessage: IChat | null
	onUnpin: () => void
}

export const PinMessage = ({ pinnedMessage, onUnpin }: PinMessageProps) => {
	if (!pinnedMessage) return null

	return (
		<div className={s.pinMessage}>
			<div className={s.header}>
				<h3>
					<img src={icons.pinnend} alt='pinnend' />
					Pinned message
				</h3>
				<Button type='default' onClick={onUnpin}>
					UNPIN
				</Button>
			</div>
			<UserInfo
				avatarSrc={pinnedMessage.avatarSrc}
				username={pinnedMessage.username}
				prefix={pinnedMessage.prefix}
				time={pinnedMessage.time}
			/>
			<div
				className={s.message}
				style={{
					background: pinnedMessage.prefix
						? pinnedMessage.color
						: 'rgb(38, 40, 50)',
				}}
			>
				<p>{pinnedMessage.message}</p>
			</div>
		</div>
	)
}
