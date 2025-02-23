import { icons } from '@/assets'
import { useAuth } from '@/Context/AuthProvider'
import { useBurger } from '@/Context/BurgerProvider'
import { useChat } from '@/Context/ChatProvider'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Option } from '../ui'
import s from './Header.module.scss'

export const Header = () => {
	const { toggleMenu } = useBurger()
	const { toggleChat } = useChat()
	const { isAuthenticated, toggleAuth, toggleDeposit } = useAuth()

	const [isSearch, setSearch] = useState(false)

	return (
		<header className={s.header}>
			<div className={s.left}>
				<Button type='icon' onClick={toggleMenu}>
					<img src={icons.burger} alt='burger' loading='lazy' />
				</Button>
				<Link to={'/'}>
					<img src={icons.logo} alt='logo' loading='lazy' className={s.logo} />
				</Link>
				<div className={s.point}>
					<img src={icons.lemonPoint} alt='lemon point' />
					<div className={s.descr}>
						<span>Lemon point</span>
						<b>50 490.34</b>
					</div>
					<Button type='green'>
						<img src={icons.loading} alt='loading' />
					</Button>
				</div>
			</div>

			{isAuthenticated && (
				<div className={s.center}>
					<span>
						<img src={icons.coin} alt='coin' />
						100 490
					</span>
					<Button type='default' onClick={toggleDeposit}>
						Deposit
					</Button>
				</div>
			)}

			<div className={s.right}>
				{isAuthenticated ? (
					<>
						<Option
							open={false}
							title={
								<>
									<img src={icons.avatar} alt='avatar' loading='lazy' />
									<div className={s.optText}>
										<span>ACCOUNT</span>
										<div className={s.rank}>
											<span></span>
											<b>Silver</b>
										</div>
									</div>
								</>
							}
							options={['Personal information']}
							newClass={s.profile}
							sxB={{
								padding: '9px 16px',
							}}
						/>
						<div className={s.inputSearch}>
							<Button
								type='icon'
								newClass={`${s.search} ${isSearch ? s.activeSearch : ''}`}
								onClick={() => setSearch(!isSearch)}
							>
								<img src={icons.search} alt='search' />
							</Button>
							<form className={`${s.formSearch} ${isSearch ? s.open : ''}`}>
								<Input
									placeholder='Search...'
									open
									newClass={`${s.searchInput}`}
								/>
								<Button type='default' newClass={s.submit}>
									SEARCH
								</Button>
							</form>
						</div>
						<Button type='icon' newClass={s.chat} onClick={toggleChat}>
							<img src={icons.chat} alt='chat' />
						</Button>
					</>
				) : (
					<>
						<Button type='disabled' onClick={toggleAuth}>
							LOG IN
						</Button>
						<Button type='default' onClick={toggleAuth}>
							REGISTER
						</Button>
					</>
				)}
			</div>
		</header>
	)
}
