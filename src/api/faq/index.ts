import axios from 'axios'
import { API_BASE_ADMIN_URL, API_BASE_USER_URL } from '../url'
import { IFAQ } from './types'

const token = localStorage.getItem('token')

export const getFaq = async () => {
	try {
		const res = await axios.get<IFAQ[]>(`${API_BASE_USER_URL}/faq`)
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
		const response = await axios.post(`${API_BASE_ADMIN_URL}/faqs`, data, {
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

export const deleteFaq = async (id: string) => {
	const response = await axios.delete(`${API_BASE_ADMIN_URL}/faqs/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	return response.data
}
