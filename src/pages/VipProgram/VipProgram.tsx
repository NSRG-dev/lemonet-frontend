import { icons } from '@/assets'
import { Banner } from '@/components/Banner/Banner'
import { BannerSection } from '@/components/BannerSection/BannerSection'
import { EditableBannerText } from '@/components/EditableBannerText/EditableBannerText'
import { EditModal } from '@/components/EditModal/EditModal'
import { FAQSection } from '@/components/FAQSection/FAQSection'
import { TABLE_HEADERS_VIP, TABLE_ROWS_VIP } from '@/constant/tableData'
import { useEditContext } from '@/Context/EditProvider'
import s from './VipProgram.module.scss'

const TableCell = ({ children }: { children: React.ReactNode }) => (
	<div className={s.cell}>
		<span>{children}</span>
	</div>
)

export const VipProgram = () => {
	const { banners, showModal } = useEditContext()

	return (
		<div className={s.vipProgram}>
			{showModal && <EditModal />}
			<BannerSection
				title={
					<EditableBannerText
						text={banners.vip.title}
						field='title'
						bannerKey='vip'
						maxLength={35}
					/>
				}
				description={
					<EditableBannerText
						text={banners.vip.description}
						field='description'
						bannerKey='vip'
						maxLength={70}
					/>
				}
				image={icons.banner3}
				buttonText='FIND OUT MORE'
				onButtonClick={() => console.log('Deposit clicked')}
				newClass={s.banner3}
				imgClass={s.imgC}
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
