import axios from 'axios'
import { toast } from 'react-toastify'
import { API_BASE_SLOTS_URL } from './slotsService'

export const getSlots = async (
	page: number = 1,
	limit: number = 9,
	sortBy: string = 'name'
): Promise<any> => {
	try {
		const response = await axios.get(`${API_BASE_SLOTS_URL}`, {
			params: { page, limit, sortBy },
		})
		return response.data
	} catch (error) {
		console.error('Ошибка при получении списка слотов:', error)
		toast.error('Ошибка при загрузке слотов')
		throw error
	}
}

export const searchSlots = async (query: string): Promise<any> => {
	try {
		const response = await axios.get(`${API_BASE_SLOTS_URL}/search`, {
			params: { query },
		})
		return response.data
	} catch (error) {
		console.error('Ошибка при поиске слотов:', error)
		toast.error('Ошибка при поиске слотов')
		throw error
	}
}

export const getSlotDetails = async (slotId: string): Promise<any> => {
	try {
		const response = await axios.get(`${API_BASE_SLOTS_URL}/${slotId}`)
		return response.data
	} catch (error) {
		console.error('Ошибка при получении деталей слота:', error)
		toast.error('Ошибка при загрузке деталей слота')
		throw error
	}
}
