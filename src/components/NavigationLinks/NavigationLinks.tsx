import { Link } from 'react-router-dom'
import s from './NavigationLinks.module.scss'

interface NavigationLinkProps {
	title: string
	links?: {
		title: string
		links: {
			label: string
			url: string
		}[]
	}
}

export const NavigationLinks = ({ title, links }: NavigationLinkProps) => {
	return (
		<div className={s.navigation}>
			<h3>{title}</h3>
			<ul>
				{links?.links.map((link, index) => (
					<li key={index}>
						<Link to={link.url}>{link.label}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
