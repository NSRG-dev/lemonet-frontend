import { icons } from '@/assets'
import { COMMENTS } from '@/constant/data'
import { useChat } from '@/Context/ChatProvider'
import { IChat } from '@/types/chat'
import React, { useEffect, useState } from 'react'
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
	const [comments, setComments] = useState<IChat[]>(() =>
		getFromLocalStorage('comments', COMMENTS)
	)
	const [selectedComment, setSelectedComment] = useState<IChat | null>(null)
	const [replies, setReplies] = useState<{ [key: string]: string }>(() =>
		getFromLocalStorage('replies', {})
	)
	const [pinnedMessage, setPinnedMessage] = useState<IChat | null>(() =>
		getFromLocalStorage('pinnedMessage', null)
	)

	useEffect(() => {
		localStorage.setItem('pinnedMessage', JSON.stringify(pinnedMessage))
		localStorage.setItem('replies', JSON.stringify(replies))
		localStorage.setItem('comments', JSON.stringify(comments))
	}, [pinnedMessage, replies, comments])

	const notify = () => toast.error('You crossed the limit of 500 characters')

	const createNewComment = (message: string): IChat => ({
		id: Date.now().toString(),
		time: new Date().toLocaleString(),
		avatarSrc: icons.avatar,
		muted: false,
		username: '@canes',
		message,
	})

	const handleSendMessage = () => {
		if (comment.length > 500) {
			notify()
			return
		}

		if (selectedComment) {
			setReplies(prev => ({
				...prev,
				[selectedComment.id]: comment,
			}))
			setComment('')
			setSelectedComment(null)
		} else {
			const newComment = createNewComment(comment)
			setComments(prev => [...prev, newComment])
			setComment('')
		}
	}

	const handleDeleteComment = (commentId: string) => {
		setComments(prev => prev.filter(comment => comment.id !== commentId))
	}

	const handleMuteUser = (commentId: string) => {
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
	}

	const handleReplyToComment = (comment: IChat) => {
		setSelectedComment(comment)
		setComment(`${comment.username} `)
	}

	const handlePinMessage = (comment: IChat) => {
		setPinnedMessage(comment)
		toast.info('Message pinned')
	}

	const handleUnpinMessage = () => {
		setPinnedMessage(null)
		toast.info('Message unpinned')
	}

	return (
		<aside className={`${s.chat} ${isOpenChat ? s.open : s.closed}`}>
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
						reply={replies[comment.id]}
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
