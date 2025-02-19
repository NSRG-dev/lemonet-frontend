import { icons } from '@/assets'
import { navigationSections, socialLinks } from '@/constant/navigation'
import { NavigationLinks } from '../NavigationLinks/NavigationLinks'
import { Button } from '../ui'
import s from './Footer.module.scss'

export const Footer = () => {
	return (
		<footer className={s.footer}>
			<div className={s.content}>
				<div className={s.left}>
					<img src={icons.logo} alt='logo' />
					<p>
						By using this site, you agree to our use of cookies to enhance your
						experience. For more details or to manage cookies, see our Cookies
						Policy. Protected by reCAPTCHA. Google Privacy Policy and Terms of
						Service apply.
					</p>
					<div className={s.social}>
						{socialLinks.map((link, index) => (
							<Button key={index} type='text'>
								<img src={link.icon} alt={link.alt} />
								<span>{link.label}</span>
							</Button>
						))}
					</div>
					<p>© 2024 Lemonet. All rights reserved.</p>
				</div>
				<div className={s.right}>
					{navigationSections.map((section, index) => (
						<NavigationLinks
							key={index}
							title={section.title}
							links={section.links}
						/>
					))}
				</div>
			</div>
		</footer>
	)
}
