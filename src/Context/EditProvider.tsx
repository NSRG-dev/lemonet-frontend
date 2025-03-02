import { createContext, ReactNode, useContext, useState } from 'react'

type BannerText = {
	title: string
	description: string
}

type BannerKey = 'home' | 'profile' | 'referral' | 'affiliates' | 'vip' | 'faq'

type EditContextType = {
	banners: Record<BannerKey, BannerText>
	updateBanner: (key: BannerKey, field: keyof BannerText, value: string) => void
	showModal: boolean
	setShowModal: (show: boolean) => void
	editingBanner: BannerKey | null
	editingField: keyof BannerText | null
	setEditingBanner: (key: BannerKey | null) => void
	setEditingField: (field: keyof BannerText | null) => void
	tempText: string
	setTempText: (text: string) => void
	openModal: (key: BannerKey, field: keyof BannerText) => void
	closeModal: () => void
	handleSave: () => void
}

const Context = createContext<EditContextType | undefined>(undefined)

type EditProviderProps = {
	children: ReactNode
}

export const EditProvider = ({ children }: EditProviderProps) => {
	const [showModal, setShowModal] = useState<boolean>(false)
	const [editingBanner, setEditingBanner] = useState<BannerKey | null>(null)
	const [editingField, setEditingField] = useState<keyof BannerText | null>(
		null
	)
	const [tempText, setTempText] = useState<string>('')

	const [banners, setBanners] = useState<Record<BannerKey, BannerText>>({
		home: {
			title: '100 Free Spins plus a $500 Bonus!',
			description: 'Spin the reels and win big today',
		},
		profile: {
			title: 'Deposit and Claim Your Bonus',
			description: 'Deposit up to $100 and get 180% added to your account!',
		},
		referral: {
			title: 'Partner with Us and Earn Big!',
			description:
				'Join our affiliate program today and unlock unlimited earning potential with high commissions and exclusive rewards!',
		},
		affiliates: {
			title: 'Partner with Us and Earn Big!',
			description:
				'Join our affiliate program today and unlock unlimited earning potential with high commissions and exclusive rewards!',
		},
		vip: {
			title: 'Join the VIP Program!',
			description:
				'Unlock exclusive bonuses, personalized service, and incredible perks.',
		},
		faq: {
			title:
				'What are the requirements to join the VIP Program, and how can I qualify for it?',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur esse, mollitia labore rem neque reprehenderit nesciunt aut sed nam soluta dolor ipsam totam iusto velit laboriosam! Illo distinctio nihil deserunt?',
		},
	})

	const updateBanner = (
		key: BannerKey,
		field: keyof BannerText,
		value: string
	) => {
		setBanners(prev => ({
			...prev,
			[key]: {
				...prev[key],
				[field]: value,
			},
		}))
	}

	const openModal = (key: BannerKey, field: keyof BannerText) => {
		setEditingBanner(key)
		setEditingField(field)
		setTempText(banners[key][field])
		setShowModal(true)
	}

	const closeModal = () => {
		setShowModal(false)
		setEditingBanner(null)
		setEditingField(null)
	}

	const handleSave = () => {
		if (editingBanner && editingField) {
			updateBanner(editingBanner, editingField, tempText)
		}
		closeModal()
	}

	return (
		<Context.Provider
			value={{
				banners,
				updateBanner,
				showModal,
				setShowModal,
				editingBanner,
				editingField,
				setEditingBanner,
				setEditingField,
				tempText,
				setTempText,
				openModal,
				closeModal,
				handleSave,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export const useEditContext = () => {
	const context = useContext(Context)
	if (!context) {
		throw new Error('useEditContext must be used within an EditProvider')
	}
	return context
}
