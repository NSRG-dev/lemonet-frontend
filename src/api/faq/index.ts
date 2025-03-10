import axios from 'axios'
import { IFAQ } from './types'

const token = localStorage.getItem('token')

export const getFaq = async () => {
	try {
		const res = await axios.get<IFAQ[]>('http://localhost:3000/api/faq')
		return res.data
	} catch (error) {
		console.error('Ошибка загрузки FAQ:', error)
	}
}

export const createFaq = async (question: string, answer: string) => {
	const data = {
		question,
		answer,
	}
	try {
		const response = await axios.post('http://localhost:3001/api/faqs', data, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		return response.data
	} catch (error) {
		console.error('Error creating faq:', error)
		throw error
	}
}

export const deletePromotion = async (id: string) => {
	const response = await axios.delete(`http://localhost:3001/api/faqs/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	return response.data
}
