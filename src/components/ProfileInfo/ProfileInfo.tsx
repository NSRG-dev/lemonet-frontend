import { icons } from '@/assets'
import { Button } from '@/components/ui'
import s from './Profile.module.scss'

interface ProfileInfoProps {
	handleLogout: () => void
}

export const ProfileInfo = ({ handleLogout }: ProfileInfoProps) => (
	<div className={s.profileInfo}>
		<div className={s.top}>
			<span className={s.avatar}>
				<img src={icons.avatar} alt='avatar' />
			</span>
			<div className={s.rank}>
				<span></span>
				<b>SILVER</b>
			</div>
		</div>
		<div className={s.middle}>
			<div className={s.user}>
				<h3>@ribbondesign</h3>
				<p>ribbonwork@gmail.com</p>
			</div>
			<Button type='icon' onClick={handleLogout}>
				<img src={icons.logout} alt='logout' />
			</Button>
		</div>
	</div>
)
