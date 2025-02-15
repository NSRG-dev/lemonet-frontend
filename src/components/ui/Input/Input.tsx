import classNames from 'classnames'
import s from './Input.module.scss'

interface Input {
	label?: string
	placeholder?: string
	open?: boolean
	disabled?: boolean
	type?: 'address'
	newClass?: string
}

export const Input = ({
	label,
	placeholder,
	open,
	disabled,
	type,
	newClass,
}: Input) => {
	const className = classNames({
		[s.address]: type === 'address',
	})
	return (
		<div className={`${s.input} ${newClass}`}>
			<label style={{ display: open ? 'none' : 'block' }}>{label}</label>
			<input
				type='text'
				placeholder={placeholder}
				disabled={disabled}
				className={className}
			/>
		</div>
	)
}
