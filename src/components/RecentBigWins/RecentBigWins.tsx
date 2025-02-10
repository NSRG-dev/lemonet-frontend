import { icons } from '@/assets'
import s from './RecentBigWins.module.scss'

interface RecentBigWinsProps {
	array: number
}

export const RecentBigWins = ({ array }: RecentBigWinsProps) => {
	return (
		<div className={s.recentBigWins}>
			<h4>Recent Big Wins</h4>
			<div className={s.cont}>
				{Array.from({ length: array }, (_, index) => (
					<div key={index} className={s.card}>
						<img src='/avatar (3).jpeg' alt='game' className={s.imageGame} />
						<div className={s.descr}>
							<span>@prowild</span>
							<b>
								<img src={icons.coin} alt='coin' />
								900
							</b>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
