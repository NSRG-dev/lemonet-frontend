import { icons } from '@/assets'
import { Button, Tabs } from '@/components/ui'
import s from './ReferralSystem.module.scss'

interface ReferralSystemProps {
	isTabs: string
	setTabs: (tab: string) => void
}

const TableRow = ({ index }: { index: number }) => (
	<div key={index} className={s.row}>
		<div className={s.cell}>
			<img src={icons.avatar} alt='avatar' />
			<h4>@MegaJackpot</h4>
		</div>
		<div className={s.cell}>
			<span>12:35</span>
			<span>17/02/2025</span>
		</div>
		<div className={s.cell}>
			<span>
				<img src={icons.coin} alt='coin' /> 100 490
			</span>
		</div>
		<div className={s.cell}>
			<span>
				<img src={icons.coin} alt='coin' /> 100 490
			</span>
		</div>
	</div>
)

export const ReferralSystem = ({ isTabs, setTabs }: ReferralSystemProps) => (
	<div className={s.referalSystem}>
		<div className={s.referalSystemBlock}>
			{Array.from({ length: 3 }, (_, index) => (
				<div key={index} className={s.balanceBlock}>
					<div className={s.balance}>
						<h3>Referral balance</h3>
						<p>
							<img src={icons.coin} alt='coin' /> 100 490
						</p>
					</div>
					<Button type='default'>WITHDRAW</Button>
				</div>
			))}
		</div>

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
					<TableRow key={index} index={index} />
				))}
			</div>
		</div>
	</div>
)
