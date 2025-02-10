import s from './Comment.module.scss'

interface CommentProps {
	avatarSrc: string
	username: string
	time: string
	message: string
}

export const Comment = ({
	avatarSrc,
	username,
	time,
	message,
}: CommentProps) => (
	<div className={s.comment}>
		<div className={s.top}>
			<div className={s.left}>
				<img src={avatarSrc} alt='avatar' />
				<span>{username}</span>
			</div>
			<div className={s.right}>
				<span>{time}</span>
			</div>
		</div>
		<div className={s.bottom}>
			<p>{message}</p>
		</div>
	</div>
)
