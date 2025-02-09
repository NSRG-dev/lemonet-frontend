import close from '@/assets/close.svg'
import { Button } from '../ui'
import s from './HeaderForm.module.scss'

interface IHeaderForm {
	title: string
	subtitle: string
}

export const HeaderForm = ({ title, subtitle }: IHeaderForm) => {
	return (
		<div className={s.header}>
			<div className={s.left}>
				<h2>{title}</h2>
				<p>{subtitle}</p>
			</div>
			<Button type='icon'>
				<img src={close} alt='close' loading='lazy' />
			</Button>
		</div>
	)
}
