import { getCurrentUser } from '@/api/chat'
import { IUser } from '@/api/chat/types'
import { createFaq, deletePromotion, getFaq } from '@/api/faq'
import { IFAQ } from '@/api/faq/types'
import { icons } from '@/assets'
import { Linkback } from '@/components/LinkBack/Linkback'
import { ModalContentEditor } from '@/components/ModalContentEditor/ModalContentEditor'
import { Button, Tabs } from '@/components/ui'
import { Accordion } from '@/components/ui/Accordion/Accordion'
import { useAuth } from '@/Context/AuthProvider'
import React, { useCallback, useEffect, useState } from 'react'
import s from './Help.module.scss'

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
	const [isOpenModal, setOpenModal] = useState(false)
	const [question, setQuestion] = useState('')
	const [answer, setAnswer] = useState('')
	const [user, setUser] = useState<IUser | null>(null)
	const { isAuthenticated } = useAuth()

	useEffect(() => {
		if (isAuthenticated) {
			getCurrentUser()
				.then(response => {
					console.log('Server response:', response)
					setUser(response)
				})
				.catch(error =>
					console.error('Ошибка загрузки данных пользователя:', error)
				)
		}
	}, [isAuthenticated])

	const toggleAccordion = useCallback((index: string) => {
		setOpenAccordion(prev => (prev === index ? null : (index as null)))
	}, [])

	useEffect(() => {
		getFaq().then(res => setFaqContent(res))
	}, [])

	const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		try {
			if (!answer || !question) {
				alert('Question and content are required.')
				return
			}

			const newPromotion = await createFaq(answer, question)
			console.log('faqContent created successfully', newPromotion)
			setFaqContent(prevPromotions => [...prevPromotions, newPromotion])

			setOpenModal(false)
		} catch (error) {
			console.error('Error creating promotion:', error)
		}
	}

	const handleDeleteFaq = async (question: string) => {
		await deletePromotion(question)
		setFaqContent(faqContent.filter(faq => faq.question !== question))
	}

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
					{user?.role.name === 'admin' && (
						<Button
							type='default'
							onClick={() => setOpenModal(!isOpenModal)}
							newClass={s.create}
						>
							Create FAQ
						</Button>
					)}
				</>
			)}
			<ModalContentEditor
				modalTitle='FAQ'
				modalSubTitle='Create faq'
				isOpenModal={isOpenModal}
				setOpenModal={setOpenModal}
				content={answer}
				title={question}
				setContent={setAnswer}
				setTitle={setQuestion}
				handleSave={handleSave}
				showFileUpload={false}
			/>
		</div>
	)
}
