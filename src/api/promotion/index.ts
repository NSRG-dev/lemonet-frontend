import axios from 'axios'

const API_BASE_PROMOTION_CARD_URL = 'http://localhost:3000/api'

const token = localStorage.getItem('token')

console.log(token)

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
			'http://localhost:3001/api/promotions',
			data,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
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
	if (!token) {
		throw new Error('Токен отсутствует. Пожалуйста, авторизуйтесь.')
	}

	const response = await axios.delete(
		`http://localhost:3001/api/promotions/${id}`,
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
		`${API_BASE_PROMOTION_CARD_URL}/promotions/search`,
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
