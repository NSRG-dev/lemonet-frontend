import { icons } from '@/assets'
import { useChat } from '@/Context/ChatProvider'
import { IChat } from '@/types/chat'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Comment } from '../Comment/Comment'
import { Button, Input } from '../ui'
import s from './Chat.module.scss'

export const Chat = React.memo(() => {
	const { isOpenChat, toggleChat } = useChat()
	const [comment, setComment] = useState('')
	const notify = () => toast.error('You crossed the limit of 500 characters')

	const comments: IChat[] = [
		{
			avatarSrc: icons.avatar,
			username: '@pro',
			time: '12:00 PM',
			message: 'bees on my head',
		},
		{
			avatarSrc: icons.avatar,
			username: '@canes',
			time: '12:00 PM',
			prefix: 'Admin',
			message: 'Anxiety don’t let the pressure get to your head !!! @3493002',
			color: 'rgba(255, 215, 12, 0.09)',
		},
	]

	const handleSendMessage = () => {
		if (comment.length > 500) {
			notify()
			return
		} else {
			setComment('')
		}
	}

	return (
		<>
			<aside className={`${s.chat} ${isOpenChat ? s.open : s.closed}`}>
				<div className={s.title}>
					<h3>
						<img src={icons.chat} alt='chat' /> Chat
					</h3>
					<Button type='icon' onClick={toggleChat}>
						<img
							src={icons.arrow}
							alt='arrow'
							style={{
								transform: 'rotate(90deg)',
							}}
						/>
					</Button>
				</div>
				<div className={s.onlineChat}>
					{comments.map((comment, index) => (
						<Comment key={index} {...comment} />
					))}
				</div>
				<div className={s.sendMessage}>
					<Input
						open
						placeholder='Enter message'
						value={comment}
						onChange={e => setComment(e.target.value)}
					/>
					<div className={s.pushMessage}>
						<span>Rules</span>
						<div className={s.btnMessage}>
							<span>{comment.length}/500</span>
							<Button type='default' onClick={handleSendMessage}>
								Send
							</Button>
						</div>
					</div>
				</div>
			</aside>
		</>
	)
})
