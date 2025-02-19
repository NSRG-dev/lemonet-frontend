import s from './NavigationLinks.module.scss'

interface NavigationLinkProps {
	title: string
	links?: string[]
}

export const NavigationLinks = ({ title, links = [] }: NavigationLinkProps) => {
	return (
		<div className={s.navigation}>
			<h3>{title}</h3>
			<ul>
				{links.map((link, index) => (
					<li key={index}>{link}</li>
				))}
			</ul>
		</div>
	)
}
