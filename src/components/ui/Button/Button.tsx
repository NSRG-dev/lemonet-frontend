import classNames from 'classnames'
import s from './Button.module.scss'

interface IButton {
	children: React.ReactNode
	type?: 'default' | 'icon' | 'text' | 'green' | 'disabled'
	newClass?: string
	onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void
	ref?: React.LegacyRef<HTMLButtonElement>
}

export const Button = ({
	children,
	type = 'default',
	newClass,
	onClick,
	ref,
}: IButton) => {
	const className = classNames(s.btn, newClass, {
		[s.default]: type === 'default',
		[s.icon]: type === 'icon',
		[s.text]: type === 'text',
		[s.green]: type === 'green',
		[s.disabled]: type === 'disabled',
	})

	return (
		<button ref={ref} className={className} onClick={onClick}>
			{children}
		</button>
	)
}
