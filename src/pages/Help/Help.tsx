import { icons } from '@/assets'
import { Linkback } from '@/components/LinkBack/Linkback'
import { Tabs } from '@/components/ui'
import s from './Help.module.scss'

export const Help = () => {
	return (
		<div className={s.help}>
			<Linkback />
			<h2>
				<img src={icons.headphone} alt='headphone' />
				Help center
			</h2>

			<Tabs />
		</div>
	)
}
