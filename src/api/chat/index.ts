import axios from 'axios'
import { API_BASE_USER_URL } from '../url'
import { IUser, type IMessage } from './types'

const getAuthHeader = () => {
	const token = localStorage.getItem('token')
	if (!token) throw new Error('Токен отсутствует.')
	return { headers: { Authorization: `Bearer ${token}` } }
}

const handleRequest = async <T>(
	request: () => Promise<T>,
	successMessage: string,
	errorMessage: string
): Promise<T> => {
	try {
		const response = await request()
		console.log(successMessage, response)
		return response
	} catch (error) {
		console.error(errorMessage, error)
		throw error
	}
}

export const getCurrentUser = async (): Promise<IUser> => {
	return handleRequest(
		() =>
			axios
				.get<IUser>(`${API_BASE_USER_URL}/users/me`, getAuthHeader())
				.then(res => res.data),
		'Данные пользователя получены',
		'Ошибка получения данных пользователя'
	)
}

export const sendMessage = async (
	content: string,
	username: string,
	email: string
): Promise<IMessage> => {
	return handleRequest(
		() =>
			axios
				.post<IMessage>(
					`${API_BASE_USER_URL}/messages`,
					{
						content: content,
						sender: {
							email: email,
							username: username,
						},
					},
					getAuthHeader()
				)
				.then(res => {
					console.log('Server response:', res.data)
					return res.data
				}),
		'Сообщение отправлено',
		'Ошибка отправки сообщения'
	)
}

export const deleteComment = async (commentId: string): Promise<void> => {
	return handleRequest(
		() =>
			axios.delete(
				`${API_BASE_USER_URL}/messages/${commentId}`,
				getAuthHeader()
			),
		'Комментарий удален',
		'Ошибка удаления комментария'
	)
}

export const muteUser = async (
	userId: string,
	muted: boolean
): Promise<void> => {
	return handleRequest(
		() =>
			axios.patch(
				`${API_BASE_USER_URL}/messages/${userId}`,
				{ muted },
				getAuthHeader()
			),
		muted ? 'Пользователь замьючен' : 'Пользователь размьючен',
		'Ошибка изменения статуса пользователя'
	)
}

export const addToBookmarks = async (
	messageId: string
): Promise<{ id: number }> => {
	return handleRequest(
		() =>
			axios
				.post<{ id: number }>(
					`${API_BASE_USER_URL}/messages`,
					{ messageId },
					getAuthHeader()
				)
				.then(res => res.data),
		'Сообщение добавлено в закладки',
		'Ошибка добавления сообщения в закладки'
	)
}

export const removeFromBookmarks = async (messageId: string): Promise<void> => {
	return handleRequest(
		() =>
			axios.delete(
				`${API_BASE_USER_URL}/messages/${messageId}`,
				getAuthHeader()
			),
		'Сообщение удалено из закладок',
		'Ошибка удаления сообщения из закладок'
	)
}
