import { Button, Input } from '../ui'
import s from './SendMessageBlock.module.scss'

interface SendMessageBlockProps {
	comment: string
	setComment: React.Dispatch<React.SetStateAction<string>>
	handleSendMessage: () => void
}

export const SendMessageBlock = ({
	comment,
	setComment,
	handleSendMessage,
}: SendMessageBlockProps) => (
	<div className={s.sendMessage}>
		<Input
			open
			placeholder='Enter message'
			value={comment}
			onChange={e => setComment(e.target.value)}
			onKeyDown={e => {
				if (e.key === 'Enter') {
					handleSendMessage()
				}
			}}
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
)
