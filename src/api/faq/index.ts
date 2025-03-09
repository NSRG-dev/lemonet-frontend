import axios from 'axios'
import { IFAQ } from './types'

export const getFaq = async () => {
	try {
		const res = await axios.get<IFAQ[]>('http://localhost:3000/api/faq')
		return res.data
	} catch (error) {
		console.error('Ошибка загрузки FAQ:', error)
	}
}