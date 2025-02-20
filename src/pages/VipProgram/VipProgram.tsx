import { icons } from '@/assets'
import { Banner } from '@/components/Banner/Banner'
import { BannerSection } from '@/components/BannerSection/BannerSection'
import { FAQSection } from '@/components/FAQSection/FAQSection'
import { TABLE_HEADERS_VIP, TABLE_ROWS_VIP } from '@/constant/tableData'
import s from './VipProgram.module.scss'

const TableCell = ({ children }: { children: React.ReactNode }) => (
	<div className={s.cell}>
		<span>{children}</span>
	</div>
)

export const VipProgram = () => {
	return (
		<div className={s.vipProgram}>
			<BannerSection
				title='Join the VIP Program!'
				description='Unlock exclusive bonuses, personalized service, and incredible perks.'
				image={icons.banner3}
				buttonText='FIND OUT MORE'
				onButtonClick={() => console.log('Deposit clicked')}
				newClass={s.banner3}
			/>

			<div className={s.bannersStarted}>
				<h4>
					<img src={icons.trophy} alt='' />
					Getting started
				</h4>
				<div className={s.container}>
					{Array.from({ length: 3 }, (_, index) => (
						<Banner key={index} />
					))}
				</div>
			</div>
			<div className={s.tables}>
				<h4>
					<img src={icons.trophy} alt='' />
					The benefits
				</h4>
				<div className={s.table}>
					<div className={s.tableRow}>
						{TABLE_HEADERS_VIP.map((header, index) => (
							<>
								<TableCell key={index}>
									<div
										className={s.rankColor}
										style={{
											backgroundColor: header.color,
										}}
									></div>
									{header.title}
								</TableCell>
							</>
						))}
					</div>
					{TABLE_ROWS_VIP.map((row, index) => (
						<div key={index} className={s.row}>
							<div className={s.cell}>
								<h5>
									<img src={row.icon} alt='' />
									{row.title}
								</h5>
							</div>
							{row.cells.map((cell, index) => (
								<TableCell key={index}>
									<img src={cell} alt='' />
								</TableCell>
							))}
						</div>
					))}
				</div>
			</div>
			<FAQSection />
		</div>
	)
}
