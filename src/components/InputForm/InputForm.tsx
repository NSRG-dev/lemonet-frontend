import { getCurrentUser } from '@/api/chat'
import { IUser } from '@/api/chat/types'
import { useAuth } from '@/Context/AuthProvider'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Input } from '../ui'
import s from './InputForm.module.scss'

export const InputForm = () => {
	const [user, setUser] = useState<IUser | null>(null)
	const [referalCode, setReferalCode] = useState<string>('')
	const [isCopied, setIsCopied] = useState(false)
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

	useEffect(() => {
		if (user) {
			setReferalCode(user.referalCode)
		}
	}, [user])

	const handleCopyAndSubmit = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault()
		navigator.clipboard.writeText(referalCode).then(() => {
			setIsCopied(true)
			toast.success('The referral code is successfully copied')
			setTimeout(() => setIsCopied(false), 2000)
		})
	}

	return (
		<div className={s.bannerInput}>
			<Input
				label='Your referral code'
				placeholder={referalCode}
				newClass={s.input}
				disabled
				type='address'
				value={referalCode}
				onChange={e => setReferalCode(e.target.value)}
			/>
			<Button type='default' onClick={handleCopyAndSubmit}>
				{isCopied ? 'Copied!' : 'COPY'}
			</Button>
		</div>
	)
}
