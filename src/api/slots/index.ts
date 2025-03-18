import axios from 'axios'
import { API_BASE_USER_URL } from '../url'

const handleRequest = async <T>(
	request: () => Promise<T>,
	errorMessage: string
): Promise<T> => {
	try {
		const response = await request()
		return (response as { data: T }).data
	} catch (error) {
		console.error(errorMessage, error)
		throw error
	}
}

export const getSlots = async (
	page: number = 1,
	limit: number = 9,
	sortBy: string = 'name'
): Promise<any> => {
	return handleRequest(
		() =>
			axios.get(`${API_BASE_USER_URL}/slots`, {
				params: { page, limit, sortBy },
			}),
		'Ошибка при загрузке слотов'
	)
}

export const searchSlots = async (query: string): Promise<any> => {
	return handleRequest(
		() => axios.get(`${API_BASE_USER_URL}/slots/search`, { params: { query } }),
		'Ошибка при поиске слотов'
	)
}

export const getSlotDetails = async (slotId: string): Promise<any> => {
	return handleRequest(
		() => axios.get(`${API_BASE_USER_URL}/slots/${slotId}`),
		'Ошибка при загрузке деталей слота'
	)
}
