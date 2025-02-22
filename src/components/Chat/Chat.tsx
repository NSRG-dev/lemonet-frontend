import { icons } from '@/assets'
import { COMMENTS } from '@/constant/data'
import { useChat } from '@/Context/ChatProvider'
import { IChat } from '@/types/chat'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Comment } from '../Comment/Comment'
import { PinMessage } from '../PinMessage/PinMessage'
import { SendMessageBlock } from '../SendMessageBlock/SendMessageBlock'
import { Button } from '../ui'
import s from './Chat.module.scss'

const getFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem(key)
		return saved ? JSON.parse(saved) : defaultValue
	}
	return defaultValue
}
export const Chat = React.memo(() => {
	const { isOpenChat, toggleChat } = useChat()
	const [comment, setComment] = useState('')
	const [selectedComment, setSelectedComment] = useState<IChat | null>(null)

	const savedChatData = getFromLocalStorage('chatData', {
		pinnedMessage: null,
		replies: {},
		comments: COMMENTS,
	})

	const [comments, setComments] = useState<IChat[]>(savedChatData.comments)
	const [replies, setReplies] = useState<{ [key: string]: IChat[] }>(
		savedChatData.replies
	)
	const [pinnedMessage, setPinnedMessage] = useState<IChat | null>(
		savedChatData.pinnedMessage
	)

	const [openOptionsId, setOpenOptionsId] = useState<string | null>(null)
	const [openReplyOptionsId, setOpenReplyOptionsId] = useState<string | null>(
		null
	)

	useEffect(() => {
		const chatData = {
			pinnedMessage,
			replies,
			comments,
		}
		localStorage.setItem('chatData', JSON.stringify(chatData))
	}, [pinnedMessage, replies, comments])

	const notify = () => toast.error('You crossed the limit of 500 characters')

	const createNewComment = useCallback(
		(message: string, username: string = '@canes'): IChat => ({
			id: Date.now().toString(),
			time: new Date().toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: '2-digit',
				hour12: true,
			}),
			avatarSrc: icons.avatar,
			muted: false,
			username,
			message,
		}),
		[]
	)

	const handleSendMessage = useCallback(() => {
		if (comment.length > 500) {
			notify()
			return
		}

		const newComment = createNewComment(comment)

		setComments(prev => (selectedComment ? prev : [...prev, newComment]))
		setReplies(prev =>
			selectedComment
				? {
						...prev,
						[selectedComment.id]: [
							...(prev[selectedComment.id] || []),
							newComment,
						],
				  }
				: prev
		)

		setComment('')
		setSelectedComment(null)
	}, [comment, selectedComment, createNewComment])

	const handleDeleteComment = useCallback((commentId: string) => {
		setComments(prev => prev.filter(comment => comment.id !== commentId))
	}, [])

	const handleMuteUser = useCallback(
		(commentId: string) => {
			setComments(prev =>
				prev.map(comment =>
					comment.id === commentId
						? { ...comment, muted: !comment.muted }
						: comment
				)
			)
			toast.info(
				comments.find(comment => comment.id === commentId)?.muted
					? "You're exhausted"
					: 'You are tortured'
			)
		},
		[comments]
	)

	const handleReplyToComment = useCallback((comment: IChat) => {
		setSelectedComment(comment)
		setComment(`${comment.username} `)
	}, [])

	const handlePinMessage = useCallback((comment: IChat) => {
		setPinnedMessage(comment)
		toast.info('Message pinned')
	}, [])

	const handleUnpinMessage = useCallback(() => {
		setPinnedMessage(null)
		toast.info('Message unpinned')
	}, [])

	const handleDeleteReply = useCallback(
		(commentId: string, replyId: string) => {
			setReplies(prev => ({
				...prev,
				[commentId]: prev[commentId].filter(reply => reply.id !== replyId),
			}))
		},
		[]
	)

	return (
		<aside
			className={`${s.chat} ${isOpenChat ? s.open : s.closed}`}
			onClick={e => e.stopPropagation()}
		>
			<div className={s.title}>
				<h3>
					<img src={icons.chat} alt='chat' /> Chat
				</h3>
				<Button type='icon' onClick={toggleChat}>
					<img
						src={icons.arrow}
						alt='arrow'
						style={{ transform: 'rotate(90deg)' }}
					/>
				</Button>
			</div>
			<PinMessage pinnedMessage={pinnedMessage} onUnpin={handleUnpinMessage} />
			<div className={s.onlineChat}>
				{comments.map(comment => (
					<Comment
						key={comment.id}
						{...comment}
						onMute={() => handleMuteUser(comment.id)}
						onDelete={() => handleDeleteComment(comment.id)}
						onDoubleClick={() => handleReplyToComment(comment)}
						handlePinMessage={() => handlePinMessage(comment)}
						replies={replies[comment.id] || []}
						onDeleteReply={replyId => handleDeleteReply(comment.id, replyId)}
						openOptionsId={openOptionsId}
						setOpenOptionsId={setOpenOptionsId}
						openReplyOptionsId={openReplyOptionsId}
						setOpenReplyOptionsId={setOpenReplyOptionsId}
					/>
				))}
			</div>
			<SendMessageBlock
				comment={comment}
				setComment={setComment}
				handleSendMessage={handleSendMessage}
			/>
		</aside>
	)
})
