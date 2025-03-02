import { icons } from '@/assets'
import { Banner } from '@/components/Banner/Banner'
import { BannerSection } from '@/components/BannerSection/BannerSection'
import { ChooseUsSection } from '@/components/ChooseUsSection/ChooseUsSection'
import { EditableBannerText } from '@/components/EditableBannerText/EditableBannerText'
import { EditModal } from '@/components/EditModal/EditModal'
import { FAQSection } from '@/components/FAQSection/FAQSection'
import { InputForm } from '@/components/InputForm/InputForm'
import { useEditContext } from '@/Context/EditProvider'
import s from './Affiliates.module.scss'

export const Affiliates = () => {
	const { banners, showModal } = useEditContext()

	return (
		<div className={s.affiliates}>
			{showModal && <EditModal />}
			<BannerSection
				title={
					<EditableBannerText
						text={banners.affiliates.title}
						field='title'
						bannerKey='affiliates'
						maxLength={35}
					/>
				}
				description={
					<EditableBannerText
						text={banners.affiliates.description}
						field='description'
						bannerKey='affiliates'
						maxLength={70}
					/>
				}
				image={icons.banner2}
				newClass={s.banner2}
			>
				<form>
					<InputForm />
					<InputForm />
				</form>
			</BannerSection>
			<ChooseUsSection />
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
			<FAQSection />
		</div>
	)
}
