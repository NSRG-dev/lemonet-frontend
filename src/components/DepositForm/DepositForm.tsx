import { icons } from '@/assets'
import { useAuth } from '@/Context/AuthProvider'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { AmountForm } from '../AmountForm/AmountForm'
import { HeaderForm } from '../HeaderForm/HeaderForm'
import { QrCode } from '../QrCode/QrCode'
import { Button, Input, Modal, Option, Tabs } from '../ui'
import s from './DepositForm.module.scss'

export const DepositForm = () => {
	const [isTab, setTab] = useState('Deposit')
	const { isOpenDeposit, toggleDeposit } = useAuth()
	const notify = () => toast.success('Copied in the Buffer of the exchange', {})

	const renderContent = () => {
		if (isTab === 'Deposit') {
			return (
				<>
					<QrCode notify={notify} />
				</>
			)
		} else {
			return (
				<>
					<Input label='Withdraw address' placeholder='Withdraw address' />
					<div className={s.amountBlock}>
						<div className={s.amountInfo}>
							<span>Withdraw amount</span>
							<span>
								<img src={icons.coin} alt='coin' loading='lazy' />
								28
							</span>
						</div>
					</div>
				</>
			)
		}
	}

	return (
		<>
			<Modal className={s.deposit} isOpen={isOpenDeposit}>
				<HeaderForm
					title={isTab === 'Deposit' ? 'Deposit' : 'Withdraw'}
					subtitle={
						isTab === 'Deposit'
							? 'Fast & secure USDT deposit'
							: 'Fast & secure payouts'
					}
					onClose={toggleDeposit}
				/>
				<Tabs
					tabs={['Deposit', 'Withdraw']}
					onClick={setTab}
					isTab={isTab}
					newClass={s.tabs}
				/>
				<div className={s.depOpt}>
					<Option
						title={
							<>
								<img src={icons.usdt} alt='usdt' loading='lazy' /> USDT
							</>
						}
						label='Deposit currency'
						options={['USDT', 'USDT']}
						sx={{
							bottom: '-110px',
						}}
					/>
					<Option
						title='Trk-20'
						label='Network'
						options={['Trk-20', 'Trk-20']}
						sx={{
							bottom: '-110px',
						}}
					/>
				</div>
				<AmountForm title='Deposit amount' placeholder='Deposit amount' />
				<div className={s.sum}>
					<span>
						<img src={icons.usdt} alt='usdt' loading='lazy' />1 <b>USDT</b>
					</span>
					<span>
						<img src={icons.coin} alt='coin' loading='lazy' />3
					</span>
				</div>
				{renderContent()}
				<Button type='default'>
					{isTab === 'Deposit' ? 'DEPOSIT' : 'WITHDRAW'}
				</Button>
				<p className={s.text}>
					{isTab === 'Deposit'
						? 'Send USDT only. Deposits confirm after 6 network verifications. No smart contracts. Contact support for help.'
						: 'To ensure account security, certain withdrawals may require up to 6 hours for verification. Thank you for your understanding!'}
				</p>
			</Modal>
			<ToastContainer
				style={{
					zIndex: 999999999999,
				}}
			/>
		</>
	)
}
