import { icons } from '@/assets'
import { useBurger } from '@/Context/BurgerProvider'
import { Button, Option } from '../ui'
import s from './Header.module.scss'

export const Header = () => {
	const { toggleMenu } = useBurger()

	return (
		<header className={s.header}>
			<div className={s.left}>
				<Button type='icon' onClick={toggleMenu}>
					<img src={icons.burger} alt='burger' loading='lazy' />
				</Button>
				<>
					<img src={icons.logo} alt='logo' loading='lazy' className={s.logo} />
				</>
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
			<div className={s.center}>
				<span>
					<img src={icons.coin} alt='coin' />
					100 490
				</span>
				<Button type='default'>Deposit</Button>
			</div>
			<div className={s.right}>
				<Option
					open={false}
					title={
						<>
							<img src={icons.bonus} alt='bonus' loading='lazy' /> Bonuses
						</>
					}
					options={['Option']}
					sx={{
						bottom: '-20px',
					}}
					sxB={{
						padding: '11px 16px',
					}}
				/>
				<Option
					open={false}
					title={
						<>
							<img src={icons.avatar} alt='avatar' loading='lazy' />
							<div className={s.optText}>
								<span>ACCOUNT</span>
								<div className={s.slider}>
									<span></span>
								</div>
							</div>
						</>
					}
					options={['Option']}
					sx={{
						bottom: '-20px',
					}}
					sxB={{
						padding: '9px 16px',
					}}
				/>
				<Button type='icon' newClass={s.search}>
					<img src={icons.search} alt='search' />
				</Button>
			</div>
		</header>
	)
}
