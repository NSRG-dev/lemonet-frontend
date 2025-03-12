import axios from 'axios'
import { API_BASE_ADMIN_URL, API_BASE_USER_URL } from '../url'
import { IBanner } from './types'

export const getBanner = async () => {
	const response = await axios.get<IBanner>(`${API_BASE_USER_URL}/banners`)
	console.log('Banner:', response.data)
	return response.data
}

export const createBanner = async (
	title: string,
	content: string,
	mediaId: string | null
) => {
	const data = {
		title,
		content,
		mediaId,
	}

	const response = await axios.post(`${API_BASE_ADMIN_URL}/banners`, data, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	})
	console.log('Created Banner:', response.data)
	return response.data
}

export const deleteBanner = async (id: string) => {
	const token = localStorage.getItem('token')

	const response = await axios.delete(`${API_BASE_ADMIN_URL}/banners/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	return response.data
}
