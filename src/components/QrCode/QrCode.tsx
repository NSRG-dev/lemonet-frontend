import { Input } from '../ui'
import s from './QrCode.module.scss'
import clone from '@/assets/clone-3 1.svg'
import qrcode from '@/assets/qrcode.svg'

export const QrCode = () => {
	return (
		<>
			<div className={s.qrcodeCont}>
				<Input
					type='address'
					label='Deposit address'
					placeholder='GJlxpep749djkkdgUJKVFYUfjicen78bHY'
					disabled
				/>
				<button>
					<img src={clone} alt='clone' loading='lazy' />
				</button>
			</div>
			<div className={s.qrcodeImage}>
				<div className={s.qrcode}>
					<img src={qrcode} alt='qrcode' loading='lazy' />
				</div>
			</div>
		</>
	)
}
