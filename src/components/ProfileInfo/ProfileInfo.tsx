import { uploadAvatar } from '@/api/users'
import { icons } from '@/assets'
import { Button } from '@/components/ui'
import { useState } from 'react'
import s from './Profile.module.scss'

interface ProfileInfoProps {
	handleLogout: () => void
	username: string
	avatarSrc: string
	email: string
}

export const ProfileInfo = ({
	handleLogout,
	username,
	avatarSrc,
	email,
}: ProfileInfoProps) => {
	const [avatar, setAvatar] = useState(avatarSrc)

	const handleAvatarChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0]
		if (file) {
			const validTypes = ['image/jpeg', 'image/png', 'image/gif']
			if (!validTypes.includes(file.type)) {
				console.error(
					'Неверный формат файла. Пожалуйста, выберите изображение.'
				)
				return
			}

			try {
				const response = await uploadAvatar(file)
				console.log('Ответ сервера:', response)

				if (response.url) {
					const newAvatarUrl = response.url
					console.log('Новый URL аватара:', newAvatarUrl)
					setAvatar(newAvatarUrl)
				}
			} catch (error) {
				console.error('Ошибка при загрузке аватара:', error)
			}
		}
	}

	return (
		<div className={s.profileInfo}>
			<div className={s.top}>
				<label className={s.avatarLabel}>
					<input
						type='file'
						accept='image/*'
						onChange={handleAvatarChange}
						className={s.avatarInput}
					/>
					<span className={s.avatar}>
						<img src={avatar} alt='avatar' />
						<div className={s.avatarOverlay}>
							<img src={icons.changeFiles} alt='change avatar' />
						</div>
					</span>
				</label>
				<div className={s.rank}>
					<span></span>
					<b>SILVER</b>
				</div>
			</div>
			<div className={s.middle}>
				<div className={s.user}>
					<h3>{username}</h3>
					<p>{email}</p>
				</div>
				<Button type='icon' onClick={handleLogout}>
					<img src={icons.logout} alt='logout' />
				</Button>
			</div>
		</div>
	)
}
