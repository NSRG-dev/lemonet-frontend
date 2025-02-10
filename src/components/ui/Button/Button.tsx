import classNames from 'classnames'
import s from './Button.module.scss'

interface IButton {
	children: React.ReactNode
	type?: 'default' | 'icon' | 'text' | 'green' | 'disabled'
	newClass?: string
	onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = ({
	children,
	type = 'default',
	newClass,
	onClick,
}: IButton) => {
	const isDisabled = type === 'disabled'

	const className = classNames(s.btn, newClass, {
		[s.default]: type === 'default',
		[s.icon]: type === 'icon',
		[s.text]: type === 'text',
		[s.green]: type === 'green',
		[s.disabled]: isDisabled,
	})

	return (
		<button
			className={className}
			onClick={isDisabled ? undefined : onClick}
			disabled={isDisabled}
		>
			{children}
		</button>
	)
}
