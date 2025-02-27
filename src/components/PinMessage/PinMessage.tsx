import { icons } from '@/assets'
import { IChat } from '@/types/chat'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui'
import { UserInfo } from '../UserInfo/UserInfo'
import s from './PinMessage.module.scss'

interface PinMessageProps {
	pinnedMessage: IChat | null
	onUnpin: (id: string) => void
	isAuthenticated: boolean
	toggleAuth: () => void
}

export const PinMessage = ({
	pinnedMessage,
	onUnpin,
	toggleAuth,
	isAuthenticated,
}: PinMessageProps) => {
	if (!pinnedMessage) return null
	const navigation = useNavigate()

	return (
		<div className={s.pinMessage}>
			<div className={s.header}>
				<h3>
					<img src={icons.pinnend} alt='pinnend' />
					Pinned message
				</h3>
				<Button type='default' onClick={() => onUnpin(pinnedMessage.id)}>
					UNPIN
				</Button>
			</div>
			<UserInfo
				avatarSrc={pinnedMessage.avatarSrc}
				username={pinnedMessage.username}
				prefix={pinnedMessage.prefix}
				time={pinnedMessage.time}
				isAuthenticated={isAuthenticated}
				toggleAuth={toggleAuth}
				navigation={navigation}
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
