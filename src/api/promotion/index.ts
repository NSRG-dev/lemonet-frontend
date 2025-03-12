import axios from 'axios'
import { API_BASE_ADMIN_URL, API_BASE_USER_URL } from '../url'

const getAuthHeader = () => {
	const token = localStorage.getItem('token')
	if (!token) throw new Error('Токен отсутствует.')
	return { headers: { Authorization: `Bearer ${token}` } }
}

export const uploadMedia = async (file: File, type: string = 'PROMOTION') => {
	const formData = new FormData()
	formData.append('file', file)
	formData.append('type', type)

	try {
		const response = await axios.post(
			`${API_BASE_USER_URL}/media/upload`,
			formData,
			{
				headers: {
					...getAuthHeader().headers,
					'Content-Type': 'multipart/form-data',
				},
			}
		)
		return response.data
	} catch (error) {
		throw error
	}
}

export const createPromotion = async (
	title: string,
	content: string,
	mediaId: string | null
) => {
	const data = {
		title,
		content,
		mediaId,
	}

	try {
		const response = await axios.post(
			`${API_BASE_ADMIN_URL}/promotions`,
			data,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		)
		return response.data
	} catch (error) {
		console.error('Error creating promotion:', error)
		throw error
	}
}

export const deletePromotion = async (id: string) => {
	const token = localStorage.getItem('token')

	const response = await axios.delete(
		`${API_BASE_ADMIN_URL}/promotions/${id}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)

	return response.data
}

export const searchPromotions = async (searchQuery: string, filters = {}) => {
	const token = localStorage.getItem('token')
	if (!token) {
		throw new Error('Токен отсутствует. Пожалуйста, авторизуйтесь.')
	}

	const response = await axios.post(
		`${API_BASE_USER_URL}/promotions/search`,
		{
			pagination: {
				count: 10,
				page: 1,
			},
			filters: {
				title: searchQuery,
				content: searchQuery,
				...filters,
			},
			sorts: {},
		},
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	)

	return response.data.data
}
