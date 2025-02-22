import { icons } from '@/assets'
import { IChat } from '@/types/chat'
import { OptionChat } from '../OptionChat/OptionChat'
import { Button } from '../ui'
import { UserInfo } from '../UserInfo/UserInfo'
import s from './Comment.module.scss'

interface CommentProps {
	id: string
	avatarSrc: string
	username: string
	time: string
	message: string
	prefix?: string
	color?: string
	onMute?: () => void
	onDelete?: () => void
	onDoubleClick?: () => void
	replies?: IChat[]
	handlePinMessage: (comment: IChat) => void
	onDeleteReply?: (replyId: string) => void
	openOptionsId: string | null
	setOpenOptionsId: (id: string | null) => void

	openReplyOptionsId: string | null // Новый пропс
	setOpenReplyOptionsId: (id: string | null) => void
}

export const Comment = ({
	id,
	avatarSrc,
	username,
	time,
	message,
	prefix,
	color = 'rgb(38, 40, 50)',
	onMute,
	onDelete,
	onDoubleClick,
	replies = [],
	handlePinMessage,
	onDeleteReply,
	openOptionsId,
	openReplyOptionsId,
	setOpenReplyOptionsId,
	setOpenOptionsId,
}: CommentProps) => {
	const currentComment: IChat = {
		id,
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
	}

	const toggleOptions = () => {
		if (openOptionsId === id) {
			setOpenOptionsId(null)
		} else {
			setOpenOptionsId(id)
			setOpenReplyOptionsId(null)
		}
	}

	const toggleReplyOptions = (replyId: string) => {
		if (openReplyOptionsId === replyId) {
			setOpenReplyOptionsId(null)
		} else {
			setOpenReplyOptionsId(replyId)
			setOpenOptionsId(null)
		}
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
				<div className={s.mes}>
					<p>{message}</p>
					{!prefix && (
						<>
							<Button type='text' onClick={toggleOptions}>
								<img src={icons.dots3} alt='3dots' />
							</Button>
							{openOptionsId === id && (
								<OptionChat
									isOpenOption={true}
									onMute={onMute}
									onDelete={onDelete}
									onPin={handlePinMessageFromOption}
								/>
							)}
						</>
					)}
				</div>
			</div>

			{Array.isArray(replies) && replies.length > 0 && (
				<div className={s.youComment}>
					<Button type='text'>
						<img src={icons.arrowc} alt='arrowc' /> You
					</Button>
					<div className={s.replies}>
						{replies.map(reply => (
							<div key={reply.id} className={s.commentYou}>
								<UserInfo
									avatarSrc={reply.avatarSrc}
									username={reply.username}
									time={reply.time}
								/>
								<div className={s.youMessage}>
									<p>{reply.message}</p>
									{!prefix && (
										<>
											<Button
												type='text'
												onClick={() => toggleReplyOptions(reply.id)}
											>
												<img src={icons.dots3} alt='3dots' />
											</Button>
											{openReplyOptionsId === reply.id && (
												<OptionChat
													isOpenOption={true}
													onMute={onMute}
													onDelete={() => onDeleteReply?.(reply.id)}
													onPin={handlePinMessageFromOption}
												/>
											)}
										</>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
