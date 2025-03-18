import clone from '@/assets/clone-3 1.svg'
import qrcode from '@/assets/qrcode.svg'
import { Button, Input } from '../ui'
import s from './QrCode.module.scss'

export const QrCode = ({ notify }: { notify: () => void }) => {
	const handleCopy = () => {
		navigator.clipboard.writeText('GJlxpep749djkkdgUJKVFYUfjicen78bHY')
		notify()
	}

	return (
		<>
			<div className={s.qrcodeCont}>
				<Input
					type='address'
					label='Deposit address'
					placeholder='GJlxpep749djkkdgUJKVFYUfjicen78bHY'
					disabled
				/>
				<Button type='text' onClick={handleCopy}>
					<img src={clone} alt='clone' loading='lazy' />
				</Button>
			</div>
			<div className={s.qrcodeImage}>
				<div className={s.qrcode}>
					<img src={qrcode} alt='qrcode' loading='lazy' />
				</div>
			</div>
		</>
	)
}
