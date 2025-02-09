import check from '@/assets/check.svg'
import { HeaderForm } from '../HeaderForm/HeaderForm'
import { Button, Input, Modal } from '../ui'
import s from './ForgotPassword.module.scss'

export const ForgotPassword = () => {
	return (
		<Modal className={s.forgotPassword}>
			<HeaderForm
				title='Forgot password?'
				subtitle='Recover your account now!'
			/>
			<form className={s.form}>
				<Input label='Your e-mail' placeholder='Enter your e-mail' />
			</form>
			<Button type='default'>SEND</Button>
			<div className={s.checked}>
				<button>
					<img src={check} alt='check' />
				</button>
				<p>
					We will send you an email with a link to reset your password. Check
					your inbox and follow the instructions!
				</p>
			</div>
		</Modal>
	)
}
