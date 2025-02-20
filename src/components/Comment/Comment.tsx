import { icons } from '@/assets'
import { useState } from 'react'
import { OptionChat } from '../OptionChat/OptionChat'
import { Button } from '../ui'
import s from './Comment.module.scss'

interface CommentProps {
	avatarSrc: string
	username: string
	time: string
	message: string
	prefix: string
	color: string
}

export const Comment = ({
	avatarSrc,
	username,
	time,
	message,
	prefix,
	color,
}: CommentProps) => {
	const [isOpenOption, setOption] = useState(false)

	return (
		<div className={s.comment}>
			<div className={s.top}>
				<div className={s.left}>
					<img src={avatarSrc} alt='avatar' />
					<span>{username}</span>
					{prefix && <span className={s.prefix}>{prefix}</span>}
				</div>
				<div className={s.right}>
					<span>{time}</span>
				</div>
			</div>
			<div
				className={s.bottom}
				style={{
					background: prefix ? color : 'rgb(38, 40, 50)',
				}}
			>
				<p>
					{message}
					{!prefix && (
						<>
							<Button type='text' onClick={() => setOption(!isOpenOption)}>
								<img src={icons.dots3} alt='3dots' />
							</Button>

							<OptionChat isOpenOption={isOpenOption} />
						</>
					)}
				</p>
			</div>
		</div>
	)
}
