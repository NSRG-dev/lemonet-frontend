import { icons } from '@/assets'
import { Linkback } from '@/components/LinkBack/Linkback'
import { Tabs } from '@/components/ui'
import { Accordion } from '@/components/ui/Accordion/Accordion'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import s from './Help.module.scss'

interface IFAQ {
	id: string
	question: string
	answer: string
}

interface IFAQContent {
	question: string
	answer: string
	isOpenAccordion: boolean
	toggleAccordion: () => void
}

const PrivacyPolicyContent = () => (
	<>
		<div className={s.info}>
			<h2>Privacy Policy</h2>
			<p>
				This Privacy Policy describes in detail how we collect, use, store, and
				share your personal information when you access our casino website,
				create an account, participate in games, and interact with any services
				offered on the platform. We are fully committed to safeguarding your
				personal data and ensuring that all your interactions with our services
				remain private and secure. Please read this document carefully to
				understand our policies and practices regarding your information. By
				using our services, you agree to the terms outlined in this Privacy
				Policy. If you do not agree with any part of this policy, we advise you
				to refrain from using our platform.
			</p>
		</div>
		<div className={s.infoLinks}>
			<h3>Information We Collect</h3>
			<p>
				When you create an account or interact with our platform, we may collect
				several types of information:
			</p>
			<ul>
				<li>
					<span>Personal Identification Information:</span> This includes, but
					is not limited to, your full name, date of birth, email address, phone
					number, and billing address. This information is required to verify
					your identity, maintain account security, and comply with legal
					regulations, such as anti-money laundering laws.
				</li>
			</ul>
		</div>
	</>
)

const FAQContent = ({
	isOpenAccordion,
	toggleAccordion,
	question,
	answer,
}: IFAQContent) => (
	<div className={s.faq}>
		<Accordion
			title={question}
			isOpen={isOpenAccordion}
			onClick={toggleAccordion}
		>
			<p>{answer}</p>
		</Accordion>
	</div>
)

export const Help = () => {
	const [activeTab, setActiveTab] = useState('Privacy Policy')
	const [isOpenAccordion, setOpenAccordion] = useState(null)
	const [faqContent, setFaqContent] = useState<IFAQ[]>([])

	const toggleAccordion = useCallback((index: string) => {
		setOpenAccordion(prev => (prev === index ? null : (index as null)))
	}, [])

	const getFaq = async () => {
		try {
			const res = await axios.get<IFAQ[]>('http://localhost:3000/api/faq')
			setFaqContent(res.data)
		} catch (error) {
			console.error('Ошибка загрузки FAQ:', error)
		}
	}

	useEffect(() => {
		getFaq()
	}, [])

	return (
		<div className={s.help}>
			<Linkback />
			<h2>
				<img src={icons.headphone} alt='headphone' />
				Help center
			</h2>
			<Tabs
				tabs={['Privacy Policy', 'Terms & Conditions', 'AML', 'FAQ']}
				isTab={activeTab}
				onClick={setActiveTab}
				newClass={s.tabs}
			/>
			{activeTab === 'Privacy Policy' && <PrivacyPolicyContent />}
			{activeTab === 'FAQ' && (
				<>
					{faqContent.map(item => (
						<FAQContent
							key={item.id}
							isOpenAccordion={isOpenAccordion === item.id}
							toggleAccordion={() => toggleAccordion(item.id)}
							question={item.question}
							answer={item.answer}
						/>
					))}
				</>
			)}
		</div>
	)
}
