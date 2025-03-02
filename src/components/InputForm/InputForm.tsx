import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Input } from '../ui'
import s from './InputForm.module.scss'

export const InputForm = () => {
	const [referalCode, setReferalCode] = useState('v4K9300dfnm0')
	const [isCopied, setIsCopied] = useState(false)

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
				placeholder='v4K9300dfnm0'
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
