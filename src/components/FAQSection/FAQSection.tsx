import { getFaq } from '@/api/faq'
import { IFAQ } from '@/api/faq/types'
import { useEffect, useState } from 'react'
import { Accordion } from '../ui/Accordion/Accordion'
import s from './FAQSection.module.scss'

export const FAQSection = () => {
	const [isOpenAccordion, setOpenAccordion] = useState(false)
	const [faqContent, setFaqContent] = useState<IFAQ[]>([])

	useEffect(() => {
		getFaq().then(res => setFaqContent(res))
	}, [])

	return (
		<div className={s.questions}>
			<h2>Frequently Asked Questions</h2>
			<p>Find everything you need to know about our platform right here</p>

			<div className={s.contAccr}>
				{faqContent.map(item => (
					<Accordion
						key={item.id}
						title={item.question}
						isOpen={isOpenAccordion}
						onClick={() => setOpenAccordion(!isOpenAccordion)}
					>
						<p>{item.answer}</p>
					</Accordion>
				))}
			</div>
		</div>
	)
}
