import { Button, Option } from '../ui'
import s from './Header.module.scss'
import { icons } from '@/assets'

export const Header = () => {
	return (
		<header className={s.header}>
			<div className={s.left}>
				<Button type='icon'>
					<img src={icons.burger} alt='burger' loading='lazy' />
				</Button>
				<span className={s.logo}>
					<img src={icons.logo} alt='logo' loading='lazy' />
				</span>
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
					open={true}
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
					open={true}
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
