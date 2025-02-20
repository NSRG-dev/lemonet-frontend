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
	{
		title: 'VIP Rank',
	},
	{
		title: 'BRONZE',
		color: 'rgb(255, 132, 105)',
	},
	{
		title: 'SILVER',
		color: 'rgb(141, 202, 255)',
	},
	{
		title: 'GOLD',
		color: 'rgb(255, 186, 133)',
	},
	{
		title: 'Platinum',
		color: 'rgb(104, 160, 255)',
	},
	{
		title: 'JADE',
		color: 'rgb(111, 239, 162)',
	},
	{
		title: 'SAPHIRE',
		color: 'rgb(103, 43, 255)',
	},
]

export const TABLE_ROWS_VIP = [
	{
		title: 'Quick Cashback',
		icon: icons.sparkle,
		cells: Array.from({ length: 6 }, () => icons.chekedTable),
	},
]
