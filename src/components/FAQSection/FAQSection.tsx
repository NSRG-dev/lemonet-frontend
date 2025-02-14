import { useState } from 'react'
import { Accordion } from '../ui/Accordion/Accordion'
import s from './FAQSection.module.scss'

export const FAQSection = () => {
	const [isOpenAccordion, setOpenAccordion] = useState(false)

	return (
		<div className={s.questions}>
			<h2>Frequently Asked Questions</h2>
			<p>Find everything you need to know about our platform right here</p>

			<div className={s.contAccr}>
				<Accordion
					title='What are the requirements to join the VIP Program, and how can I qualify for it?'
					isOpen={isOpenAccordion}
					onClick={() => setOpenAccordion(!isOpenAccordion)}
				>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
						esse, mollitia labore rem neque reprehenderit nesciunt aut sed nam
						soluta dolor ipsam totam iusto velit laboriosam! Illo distinctio
						nihil deserunt?
					</p>
				</Accordion>
			</div>
		</div>
	)
}
