import { Button, Input } from '../ui'
import s from './InputForm.module.scss'

export const InputForm = () => {
	return (
		<div className={s.bannerInput}>
			<Input
				label='Your referral code'
				placeholder='v4K9300dfnm0'
				newClass={s.input}
				disabled
				type='address'
			/>
			<Button type='default'>COPY</Button>
		</div>
	)
}
