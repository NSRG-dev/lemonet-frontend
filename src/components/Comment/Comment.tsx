import { icons } from '@/assets'
import { IChat } from '@/types/chat'
import { useState } from 'react'
import { OptionChat } from '../OptionChat/OptionChat'
import { Button } from '../ui'
import { UserInfo } from '../UserInfo/UserInfo'
import s from './Comment.module.scss'

interface CommentProps {
	avatarSrc: string
	username: string
	time: string
	message: string
	prefix?: string
	color?: string
	onMute?: () => void
	onDelete?: () => void
	onDoubleClick?: () => void
	reply?: string
	handlePinMessage: (comment: IChat) => void
}

export const Comment = ({
	avatarSrc,
	username,
	time,
	message,
	prefix,
	color = 'rgb(38, 40, 50)',
	onMute,
	onDelete,
	onDoubleClick,
	reply,
	handlePinMessage,
}: CommentProps) => {
	const [isOpenOption, setOption] = useState(false)

	const currentComment: IChat = {
		id: Date.now().toString(),
		time,
		avatarSrc,
		username,
		message,
		prefix,
		color,
		muted: false,
	}

	const handlePinMessageFromOption = () => {
		handlePinMessage(currentComment)
		setOption(false)
	}

	return (
		<div className={s.comment} onDoubleClick={onDoubleClick}>
			<UserInfo
				avatarSrc={avatarSrc}
				username={username}
				prefix={prefix}
				time={time}
			/>
			<div
				className={s.bottom}
				style={{ background: prefix ? color : 'rgb(38, 40, 50)' }}
			>
				<p>
					{message}
					{!prefix && (
						<>
							<Button type='text' onClick={() => setOption(!isOpenOption)}>
								<img src={icons.dots3} alt='3dots' />
							</Button>
							<OptionChat
								isOpenOption={isOpenOption}
								onMute={onMute}
								onDelete={onDelete}
								onPin={handlePinMessageFromOption}
							/>
						</>
					)}
				</p>
			</div>

			{reply && (
				<div className={s.youComment}>
					<Button type='text'>
						<img src={icons.arrowc} alt='arrowc' /> You
					</Button>

					<div className={s.commentYou}>
						<UserInfo
							avatarSrc={avatarSrc}
							username={username}
							prefix={prefix}
							time={time}
						/>
						<div className={s.youMessage}>
							<p>{reply}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
