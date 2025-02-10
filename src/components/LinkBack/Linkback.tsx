import { Link } from 'react-router-dom'
import { Button } from '../ui'
import { icons } from '@/assets'
import s from './Linkback.module.scss'

export const Linkback = () => {
	return (
			<Link to={'/'} className={s.backLink}>
				<Button type='icon'>
					<img
						src={icons.arrow}
						alt='arrow'
						style={{ transform: 'rotate(-90deg)' }}
					/>
				</Button>
				Back to home page
			</Link>
	)
}
