import { Button, Input } from '../ui'
import s from './FormBlock.module.scss'

export const FormBlock = () => {
	return (
		<div className={s.containerInfo}>
			<h3>Personal information</h3>
			<p>Control your earnings</p>
			<form>
				<Input
					label='Your email'
					placeholder='Enter your email'
					newClass={s.input}
				/>
				<Input
					label='Your email'
					placeholder='Enter your email'
					newClass={s.input}
				/>
				<Input
					label='Your email'
					placeholder='Enter your email'
					newClass={s.input}
				/>
				<Button type='default'>CHANGE</Button>
			</form>
		</div>
	)
}
