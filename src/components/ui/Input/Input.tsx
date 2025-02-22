import classNames from 'classnames'
import s from './Input.module.scss'

interface Input {
	label?: string
	placeholder?: string
	open?: boolean
	disabled?: boolean
	type?: 'address'
	newClass?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	value?: string
	onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
}

export const Input = ({
	label,
	placeholder,
	open,
	disabled,
	type,
	newClass,
	onChange,
	value,
	onKeyDown,
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
				onChange={onChange}
				value={value}
				onKeyDown={onKeyDown}
			/>
		</div>
	)
}
