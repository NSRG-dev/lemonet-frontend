import { Button, Input } from '../ui'
import s from './AmountForm.module.scss'

interface IAmountForm {
	title: string
	placeholder: string
}

export const AmountForm = ({ title, placeholder }: IAmountForm) => {
	return (
		<div className={s.amountform}>
			<Input label={title} placeholder={placeholder} disabled />
			<div className={s.amount}>
				{['Min', '10', '20', '30', '50', 'Max'].map((btn, index) => (
					<Button type='icon' key={index}>
						{btn}
					</Button>
				))}
			</div>
		</div>
	)
}
