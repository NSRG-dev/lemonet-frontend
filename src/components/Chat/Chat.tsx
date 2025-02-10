import { icons } from '@/assets'
import React, { useState } from 'react'
import { Comment } from '../Comment/Comment'
import { Button, Input } from '../ui'
import s from './Chat.module.scss'

export const Chat = React.memo(() => {
	const [isOpen, setOpen] = useState(true)

	const comments = [
		{
			avatarSrc: icons.avatar,
			username: '@pro',
			time: '12:00 PM',
			message: 'bees on my head',
		},
	]

	return (
		<>
			{!isOpen && (
				<Button type='icon' onClick={() => setOpen(true)} newClass={s.openChat}>
					<img
						src={icons.arrow}
						alt='arrow'
						style={{
							transform: 'rotate(-90deg)',
						}}
					/>
				</Button>
			)}
			<aside
				className={`${s.chat} ${isOpen ? s.open : s.closed}`}
				style={{
					display: isOpen ? 'block' : 'none',
				}}
			>
				<div className={s.title}>
					<h3>
						<img src={icons.chat} alt='chat' /> Chat
					</h3>
					<Button type='icon' onClick={() => setOpen(false)}>
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
						<Comment
							key={index}
							avatarSrc={comment.avatarSrc}
							username={comment.username}
							time={comment.time}
							message={comment.message}
						/>
					))}
				</div>
				<div className={s.sendMessage}>
					<Input open placeholder='Enter message' />
					<div className={s.pushMessage}>
						<span>Rules</span>
						<div className={s.btnMessage}>
							<span>0/500</span>
							<Button type='default'>Send</Button>
						</div>
					</div>
				</div>
			</aside>
		</>
	)
})
