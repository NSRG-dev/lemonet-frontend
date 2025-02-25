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
	error?: string
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
	error,
}: Input) => {
	const className = classNames({
		[s.address]: type === 'address',
	})
	return (
		<div className={`${s.input} ${newClass}`}>
			<label
				style={{
					display: open ? 'none' : 'block',
					color: error ? '#ff5353' : 'rgb(104, 108, 123)',
				}}
			>
				{label}
			</label>
			<input
				type='text'
				placeholder={placeholder}
				disabled={disabled}
				className={className}
				onChange={onChange}
				value={value}
				onKeyDown={onKeyDown}
				style={{
					borderColor: error ? '#ff5353' : 'transparent',
					color: error ? '#ff5353' : 'rgb(104, 108, 123)',
				}}
			/>
			{error && <span className={s.errorMessage}>{error}</span>}
		</div>
	)
}
