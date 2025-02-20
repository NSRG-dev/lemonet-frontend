import { icons } from '@/assets'
import { Banner } from '@/components/Banner/Banner'
import { BannerSection } from '@/components/BannerSection/BannerSection'
import { ChooseUsSection } from '@/components/ChooseUsSection/ChooseUsSection'
import { FAQSection } from '@/components/FAQSection/FAQSection'
import { InputForm } from '@/components/InputForm/InputForm'
import s from './Affiliates.module.scss'

export const Affiliates = () => {
	return (
		<div className={s.affiliates}>
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
