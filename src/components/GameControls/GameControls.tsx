import { Button, Tabs } from '@/components/ui'
import s from './GameControls.module.scss'
import { icons } from '@/assets'

interface GameControlsProps {
	isTab: string
	setTab: (tabIndex: string) => void
	array: string[]
}

export const GameControls = ({ isTab, setTab, array }: GameControlsProps) => {
	return (
		<div className={s.control}>
			<div className={s.left}>
				<Tabs tabs={array} isTab={isTab} onClick={setTab} />
			</div>
			<div className={s.right}>
				<Button type='icon'>
					<img src={icons.close} alt="contols" />
				</Button>
				<Button type='icon'>
					<img src={icons.volume_high} alt="contols" />
				</Button>
				<Button type='icon'>
					<img src={icons.info_circle} alt="contols" />
				</Button>
				<Button type='icon'>
					<img src={icons.cancel} alt="contols" />
				</Button>
			</div>
		</div>
	)
}
