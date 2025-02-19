import { icons } from '@/assets'
import { Linkback } from '@/components/LinkBack/Linkback'
import { SportGameBlock } from '@/components/SportGameBlock/SportGameBlock'
import { TableResultMobileSport } from '@/components/TableResultMobileSport/TableResultMobileSport'
import { TableResultSport } from '@/components/TableResultSport/TableResultSport'
import { TableMobile, TableSportbook } from '@/components/TableSport/TableSport'
import { Input, Tabs } from '@/components/ui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './Sport.module.scss'

export const Sport = () => {
	const [activeTab, setActiveTab] = useState('All')
	const navigate = useNavigate()

	const handleTabClick = (tab: string) => {
		if (tab === 'Help') {
			navigate('/help')
		} else {
			setActiveTab(tab)
		}
	}

	const renderTables = () => {
		if (['All', 'Pre-match', 'My bets', 'Live'].includes(activeTab)) {
			return (
				<>
					<TableMobile option={activeTab} />
					<TableSportbook option={activeTab} />
				</>
			)
		}
		return null
	}

	return (
		<div className={s.sport}>
			<Linkback />
			<h2>
				<img src={icons.sport} alt='sport' />
				Sport
			</h2>
			<div className={s.games}>
				{Array.from({ length: 3 }).map((_, index) => (
					<SportGameBlock key={index} />
				))}
			</div>
			<div className={s.header}>
				<Tabs
					isTab={activeTab}
					onClick={handleTabClick}
					tabs={['All', 'Pre-match', 'Live', 'My bets', 'Results', 'Help']}
					newClass={s.tabs}
				/>
				<div className={s.form}>
					<Input open placeholder='Search' newClass={s.search} />
					<div className={s.btn}>
						<img src={icons.ticket} alt='ticket' /> Betslip <span>3</span>
					</div>
				</div>
			</div>

			<div className={s.tabletabs}>
				{renderTables()}
				{activeTab === 'Results' && (
					<>
						<TableResultSport />
						<TableResultMobileSport />
					</>
				)}
			</div>
		</div>
	)
}
