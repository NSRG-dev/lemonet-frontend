import { useEditContext } from '@/Context/EditProvider'
import { useState } from 'react'
import { EditableAccordionText } from '../EditableAccordionText/EditableAccordionText'
import { Accordion } from '../ui/Accordion/Accordion'
import s from './FAQSection.module.scss'

export const FAQSection = () => {
	const [isOpenAccordion, setOpenAccordion] = useState(false)
	const { banners } = useEditContext()

	return (
		<div className={s.questions}>
			<h2>Frequently Asked Questions</h2>
			<p>Find everything you need to know about our platform right here</p>

			<div className={s.contAccr}>
				<Accordion
					title={
						<EditableAccordionText
							text={banners.faq.title}
							field='title'
							accordionKey='faq'
							maxLength={100}
						/>
					}
					isOpen={isOpenAccordion}
					onClick={() => setOpenAccordion(!isOpenAccordion)}
				>
					<p>
						<EditableAccordionText
							text={banners.faq.description}
							field='description'
							accordionKey='faq'
							maxLength={200}
						/>
					</p>
				</Accordion>
			</div>
		</div>
	)
}
