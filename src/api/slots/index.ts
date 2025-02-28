import axios from 'axios'
import { toast } from 'react-toastify'
import { API_BASE_SLOTS_URL } from './slotsService'

const handleRequest = async <T>(
	request: () => Promise<T>,
	errorMessage: string
): Promise<T> => {
	try {
		const response = await request()
		return response.data
	} catch (error) {
		console.error(errorMessage, error)
		toast.error(errorMessage)
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
			axios.get(`${API_BASE_SLOTS_URL}`, { params: { page, limit, sortBy } }),
		'Ошибка при загрузке слотов'
	)
}

export const searchSlots = async (query: string): Promise<any> => {
	return handleRequest(
		() => axios.get(`${API_BASE_SLOTS_URL}/search`, { params: { query } }),
		'Ошибка при поиске слотов'
	)
}

export const getSlotDetails = async (slotId: string): Promise<any> => {
	return handleRequest(
		() => axios.get(`${API_BASE_SLOTS_URL}/${slotId}`),
		'Ошибка при загрузке деталей слота'
	)
}
