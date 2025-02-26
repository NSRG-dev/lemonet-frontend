import axios from 'axios'
import { toast } from 'react-toastify'
import { API_BASE_URL } from './authService'

export const sendMessage = async (
	message: string,
	username: string
): Promise<void> => {
	try {
		const token = localStorage.getItem('token')
		if (!token) throw new Error('Токен отсутствует.')

		const response = await axios.post(
			`${API_BASE_URL}/message`,
			{
				content: message,
				username,
			},
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		)

		console.log('Сообщение отправлено успешно!', response.data)
		toast.success('Сообщение отправлено')
	} catch (error) {
		console.error('Ошибка отправки сообщения:', error)
		toast.error('Ошибка отправки сообщения')
		throw error
	}
}

export const deleteComment = async (commentId: string): Promise<void> => {
	try {
		const token = localStorage.getItem('token')
		if (!token) throw new Error('Токен отсутствует.')

		const response = await axios.delete(
			`${API_BASE_URL}/message/${commentId}`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		)

		console.log('Комментарий удален успешно!', response.data)
		toast.success('Комментарий удален')
	} catch (error) {
		console.error('Ошибка удаления комментария:', error)
		toast.error('Ошибка удаления комментария')
		throw error
	}
}

export const muteUser = async (
	userId: string,
	muted: boolean
): Promise<void> => {
	try {
		const token = localStorage.getItem('token')
		if (!token) throw new Error('Токен отсутствует.')

		const response = await axios.patch(
			`${API_BASE_URL}/message/${userId}`,
			{ muted },
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		)

		console.log('Пользователь успешно замьючен/размьючен!', response.data)
		toast.success(muted ? 'Пользователь замьючен' : 'Пользователь размьючен')
	} catch (error) {
		console.error('Ошибка изменения статуса пользователя:', error)
		toast.error('Ошибка изменения статуса пользователя')
		throw error
	}
}

export const addToBookmarks = async (messageId: string): Promise<void> => {
	try {
		const token = localStorage.getItem('token')
		if (!token) throw new Error('Токен отсутствует.')

		const response = await axios.post(
			`${API_BASE_URL}/message`,
			{ messageId },
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		)

		console.log('Сообщение добавлено в закладки!', response.data)
		toast.success('Сообщение добавлено в закладки')
	} catch (error) {
		console.error('Ошибка добавления сообщения в закладки:', error)
		toast.error('Ошибка добавления сообщения в закладки')
		throw error
	}
}

export const removeFromBookmarks = async (messageId: string): Promise<void> => {
	try {
		const token = localStorage.getItem('token')
		if (!token) throw new Error('Токен отсутствует.')

		const response = await axios.delete(
			`${API_BASE_URL}/message/${messageId}`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		)

		console.log('Сообщение удалено из закладок!', response.data)
		toast.success('Сообщение удалено из закладок')
	} catch (error) {
		console.error('Ошибка удаления сообщения из закладок:', error)
		toast.error('Ошибка удаления сообщения из закладок')
		throw error
	}
}
