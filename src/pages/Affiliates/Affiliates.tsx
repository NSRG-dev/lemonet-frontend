import { icons } from '@/assets'
import { Banner } from '@/components/Banner/Banner'
import { ChooseUsSection } from '@/components/ChooseUsSection/ChooseUsSection'
import { FAQSection } from '@/components/FAQSection/FAQSection'
import s from './Affiliates.module.scss'

export const Affiliates = () => {
	return (
		<div className={s.affiliates}>
			<ChooseUsSection />
			<div className={s.bannersStarted}>
				<h4>
					<img src={icons.bonuses} alt='' />
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
