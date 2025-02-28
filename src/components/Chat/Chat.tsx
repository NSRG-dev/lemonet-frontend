import {
	addToBookmarks,
	deleteComment,
	getMessage,
	muteUser,
	removeFromBookmarks,
	sendMessage,
} from '@/api/chat'
import { icons } from '@/assets'
import { COMMENTS } from '@/constant/data'
import { useAuth } from '@/Context/AuthProvider'
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
	const [isScrolled, setIsScrolled] = useState(false)
	const { isAuthenticated, username, toggleAuth } = useAuth()

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
		const fetchMessages = async () => {
			try {
				const messages = await getMessage()
				setComments(messages)
			} catch (error) {
				toast.error('Ошибка загрузки сообщений')
			}
		}
		fetchMessages()
	}, [])

	useEffect(() => {
		const chatData = {
			pinnedMessage,
			replies,
			comments,
		}
		localStorage.setItem('chatData', JSON.stringify(chatData))
	}, [pinnedMessage, replies, comments])

	useEffect(() => {
		const chatContainer = document.querySelector(`.${s.onlineChat}`)
		if (!chatContainer) return

		const handleScroll = () => {
			const isUserScrolledUp =
				chatContainer.scrollTop + chatContainer.clientHeight <
				chatContainer.scrollHeight - 100
			setIsScrolled(isUserScrolledUp)
		}

		chatContainer.addEventListener('scroll', handleScroll)
		return () => chatContainer.removeEventListener('scroll', handleScroll)
	}, [])

	const notify = () => toast.error('You crossed the limit of 500 characters')

	const createNewComment = useCallback(
		(message: string): IChat => ({
			id: Date.now().toString(),
			time: new Date().toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: '2-digit',
				hour12: true,
			}),
			avatarSrc: icons.avatar,
			muted: false,
			username: username || 'Guest',
			message,
		}),
		[username]
	)

	const handleSendMessage = useCallback(async () => {
		if (comment.length > 500) {
			notify()
			return
		}
		try {
			const response = await sendMessage(comment, username || 'Guest')
			const newComment = createNewComment(response.data.content)

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
		} catch (error) {
			console.error('Ошибка отправки сообщения:', error)
		}
	}, [comment, selectedComment, createNewComment, username])

	const handleDeleteComment = useCallback(async (commentId: string) => {
		try {
			await deleteComment(commentId)
			setComments(prev => prev.filter(comment => comment.id !== commentId))
		} catch (error) {
			console.error('Ошибка удаления комментария:', error)
		}
	}, [])

	const handleMuteUser = useCallback(
		async (commentId: string) => {
			try {
				const comment = comments.find(c => c.id === commentId)
				if (comment) {
					await muteUser(comment.id, !comment.muted)
					setComments(prev =>
						prev.map(c => (c.id === commentId ? { ...c, muted: !c.muted } : c))
					)
					toast.info(
						comment.muted ? 'Пользователь размьючен' : 'Пользователь замьючен'
					)
				}
			} catch (error) {
				console.error('Ошибка изменения статуса пользователя:', error)
			}
		},
		[comments]
	)

	const handleReplyToComment = useCallback((comment: IChat) => {
		setSelectedComment(comment)
		setComment(`${comment.username} `)
	}, [])

	const handleAddToBookmarks = useCallback(
		async (messageId: string) => {
			try {
				await addToBookmarks(messageId)
				const pinnedComment = comments.find(comment => comment.id === messageId)
				if (pinnedComment) {
					setPinnedMessage(pinnedComment)
					toast.success('Сообщение закреплено')
				}
			} catch (error) {
				console.error('Ошибка добавления сообщения в закладки:', error)
				toast.error('Ошибка добавления сообщения в закладки')
			}
		},
		[comments]
	)

	const handleRemoveFromBookmarks = useCallback(async (messageId: string) => {
		try {
			await removeFromBookmarks(messageId)
		} catch (error) {
			console.error('Ошибка удаления сообщения из закладок:', error)
		}
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
			<PinMessage
				pinnedMessage={pinnedMessage}
				onUnpin={() => {
					if (pinnedMessage) {
						handleRemoveFromBookmarks(pinnedMessage.id)
					}
				}}
				toggleAuth={toggleAuth}
				isAuthenticated={isAuthenticated}
			/>
			<div className={s.onlineChat}>
				{comments.map(comment => (
					<Comment
						key={comment.id}
						{...comment}
						onMute={() => handleMuteUser(comment.id)}
						onDelete={() => handleDeleteComment(comment.id)}
						onDoubleClick={() => handleReplyToComment(comment)}
						handleAddToBookmarks={() => handleAddToBookmarks(comment.id)}
						handleRemoveFromBookmarks={() =>
							handleRemoveFromBookmarks(comment.id)
						}
						replies={replies[comment.id] || []}
						onDeleteReply={replyId => handleDeleteReply(comment.id, replyId)}
						openOptionsId={openOptionsId}
						setOpenOptionsId={setOpenOptionsId}
						openReplyOptionsId={openReplyOptionsId}
						setOpenReplyOptionsId={setOpenReplyOptionsId}
						toggleAuth={toggleAuth}
						isAuthenticated={isAuthenticated}
					/>
				))}
			</div>
			{isScrolled && (
				<Button
					type='icon'
					newClass={s.scrollToBottomButton}
					onClick={() => {
						const chatContainer = document.querySelector(`.${s.onlineChat}`)
						if (chatContainer) {
							chatContainer.scrollTo({
								top: chatContainer.scrollHeight,
								behavior: 'smooth',
							})
						}
					}}
				>
					<img src={icons.arrow} alt='Scroll to bottom' />
				</Button>
			)}
			<SendMessageBlock
				comment={comment}
				setComment={setComment}
				handleSendMessage={handleSendMessage}
			/>
		</aside>
	)
})
