import { icons } from '@/assets'
import { GameHistoryData, TableDataTransactionHistory } from '@/types/table'

export const gameHistoryTableData: GameHistoryData[] = Array.from(
	{ length: 10 },
	() => ({
		game: 'Sky Bounty',
		time: '12:35',
		date: '17/02/2025',
		balanceBefore: '100 490',
		bet: '100 490',
		multiplier: '2x',
		profit: '100 490',
		balanceAfter: '100 490',
	})
)

export const gameHistoryTableHeaders = [
	'GAME',
	'DATE',
	'BALANCE BEFORE',
	'BET',
	'X',
	'YOUR PROFIT',
	'BALANCE AFTER',
]

export const transactionHistoryTableData: TableDataTransactionHistory[] =
	Array.from({ length: 10 }, () => ({
		type: 'Deposit',
		time: '12:35',
		date: '17/02/2025',
		balanceBefore: '100 490',
		amount: '100 490',
		status: 'Successfully',
		balanceAfter: '100 490',
	}))

export const transactionHistoryTableHeaders = [
	'TYPE',
	'DATE',
	'BALANCE BEFORE',
	'AMOUNT',
	'STATUS',
	'BALANCE AFTER',
]

export const TABLE_HEADERS_VIP = [
	'VIP Rank',
	'BRONZE',
	'SILVER',
	'GOLD',
	'Platinum',
	'JADE',
	'SAPHIRE',
]

export const TABLE_ROWS_VIP = [
	{
		title: 'Quick Cashback',
		icon: icons.bonuses,
		cells: Array.from({ length: 6 }, () => icons.chekedTable),
	},
]
