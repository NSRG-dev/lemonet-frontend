import classNames from 'classnames'
import s from './Button.module.scss'

interface Button {
	children: React.ReactNode
	type: 'default' | 'icon' | 'text'
}

export const Button = ({ children, type }: Button) => {
	const className = classNames(s.btn, {
		[s.default]: type === 'default',
		[s.icon]: type === 'icon',
		[s.text]: type === 'text',
	})

	return <button className={className}>{children}</button>
}
