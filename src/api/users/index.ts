import axios from 'axios'

export const API_BASE_IMG_URL = 'http://localhost:3000/api'

const getAuthHeader = () => {
	const token = localStorage.getItem('token')
	if (!token) throw new Error('Токен отсутствует.')
	return { headers: { Authorization: `Bearer ${token}` } }
}

export const uploadAvatar = async (file: File, type: string = 'AVATAR') => {
	const formData = new FormData()
	formData.append('file', file)
	formData.append('type', type)

	for (const [key, value] of formData.entries()) {
		console.log(key, value)
	}

	try {
		const response = await axios.post(
			`${API_BASE_IMG_URL}/media/upload`,
			formData,
			{
				headers: {
					...getAuthHeader().headers,
					'Content-Type': 'multipart/form-data',
				},
			}
		)
		console.log('Ответ сервера:', response.data)
		return response.data
	} catch (error) {
		console.error('Ошибка загрузки аватара:', error)
		throw error
	}
}


export const getAvatar = async (key: string) => {
	try {
		const response = await axios.get(`${API_BASE_IMG_URL}/media/${key}`, {
			...getAuthHeader(),
			responseType: 'blob',
		})
		return URL.createObjectURL(response.data)
	} catch (error) {
		console.error('Ошибка получения аватара:', error)
		throw error
	}
}

