import { Button, Tabs } from '@/components/ui'
import s from './GameControls.module.scss'

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
				<Button type='icon'>s</Button>
				<Button type='icon'>s</Button>
				<Button type='icon'>s</Button>
				<Button type='icon'>s</Button>
			</div>
		</div>
	)
}
