import classNames from 'classnames'
import s from './Button.module.scss'

interface IButton {
	children: React.ReactNode
	type: 'default' | 'icon' | 'text' | 'green'
	newClass?: string | undefined
}

export const Button = ({ children, type, newClass }: IButton) => {
	const className = classNames(s.btn, {
		[s.default]: type === 'default',
		[s.icon]: type === 'icon',
		[s.text]: type === 'text',
		[s.green]: type === 'green',
		[newClass]: newClass,
	})

	return <button className={className}>{children}</button>
}
