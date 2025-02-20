import { icons } from '@/assets'
import { Button, Tabs } from '@/components/ui'
import { useMemo } from 'react'
import { BannerSection } from '../BannerSection/BannerSection'
import { InputForm } from '../InputForm/InputForm'
import s from './ReferralSystem.module.scss'

interface ReferralSystemProps {
	isTabs: string
	setTabs: (tab: string) => void
}

interface TableRowProps {
	index: number
	user: string
	date: string
	time: string
	deposit: number
	profit: number
}

const TableRow = ({
	index,
	user,
	date,
	time,
	deposit,
	profit,
}: TableRowProps) => (
	<div key={index} className={s.row}>
		<div className={s.cell}>
			<img src={icons.avatar} alt='avatar' />
			<h4>{user}</h4>
		</div>
		<div className={s.cell}>
			<span>{time}</span>
			<span>{date}</span>
		</div>
		<div className={s.cell}>
			<span>
				<img src={icons.coin} alt='coin' /> {deposit}
			</span>
		</div>
		<div className={s.cell}>
			<span>
				<img src={icons.coin} alt='coin' /> {profit}
			</span>
		</div>
	</div>
)

export const ReferralSystem = ({ isTabs, setTabs }: ReferralSystemProps) => {
	const balanceBlocks = useMemo(
		() =>
			[1, 2, 3].map((_, index) => (
				<div key={index} className={s.balanceBlock}>
					<div className={s.balance}>
						<h3>Referral balance</h3>
						<p>
							<img src={icons.coin} alt='coin' /> 100 490
						</p>
					</div>
					<Button type='default'>WITHDRAW</Button>
				</div>
			)),
		[]
	)

	return (
		<div className={s.referalSystem}>
			<BannerSection
				title='Partner with Us and Earn Big!'
				description='Join our affiliate program today and unlock unlimited earning potential with high commissions and exclusive rewards!'
				image={icons.banner2}
				newClass={s.banner2}
			>
				<form>
					<InputForm />
					<InputForm />
				</form>
			</BannerSection>
			<div className={s.referalSystemBlock}>{balanceBlocks}</div>
			<div className={s.table}>
				<div className={s.header}>
					<div className={s.title}>
						<h3>Your referals</h3>
						<p>Controle your earnings</p>
					</div>
					<Tabs
						isTab={isTabs}
						onClick={setTabs}
						tabs={['DAILY', 'WEEKLY', 'MONTHLY']}
					/>
				</div>
				<div className={s.tables}>
					<div className={s.tableRow}>
						{['USERS', 'DATE', 'DEPOSITS', 'YOUR PROFIT'].map((row, index) => (
							<div className={s.cell} key={index}>
								<span>{row}</span>
							</div>
						))}
					</div>
					{Array.from({ length: 6 }, (_, index) => (
						<TableRow
							key={index}
							index={index}
							user='@MegaJackpot'
							date='17/02/2025'
							time='12:35'
							deposit={100490}
							profit={100490}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
