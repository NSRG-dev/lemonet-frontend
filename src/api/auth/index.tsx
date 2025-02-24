import axios from 'axios'
import { setupInterceptors } from './interceptors'
import { removeTokens, saveEmail, saveTokens, saveUsername } from './tokens'
import { API_BASE_URL, AuthResponse, LoginData, RegisterData } from './types'

setupInterceptors()

export const signupUser = async (data: RegisterData): Promise<AuthResponse> => {
	try {
		const response = await axios.post<AuthResponse>(
			`${API_BASE_URL}/sign-up`,
			data
		)
		removeTokens()
		saveTokens(response.data.accessToken, response.data.refreshToken)
		saveUsername(data.username)
		saveEmail(data.email)
		console.log('Регистрация прошла успешно!', response.data)
		return response.data
	} catch (error) {
		throw handleError(error, 'Ошибка регистрации')
	}
}

export const siginUser = async (data: LoginData): Promise<AuthResponse> => {
	try {
		const response = await axios.post<AuthResponse>(
			`${API_BASE_URL}/sign-in`,
			data
		)
		removeTokens()
		saveTokens(response.data.accessToken, response.data.refreshToken)
		saveEmail(data.email)
		console.log('Вход выполнен успешно!', response.data)
		return response.data
	} catch (error) {
		throw handleError(error, 'Ошибка входа')
	}
}

export const refreshToken = async (): Promise<AuthResponse> => {
	try {
		const refreshToken = localStorage.getItem('refreshToken')
		if (!refreshToken) throw new Error('Refresh token отсутствует.')

		const response = await axios.post<AuthResponse>(`${API_BASE_URL}/refresh`, {
			refreshToken,
		})
		saveTokens(response.data.accessToken, response.data.refreshToken)
		console.log('Токен обновлен успешно!', response.data)
		return response.data
	} catch (error) {
		throw handleError(error, 'Ошибка обновления токена')
	}
}

export const logoutUser = async (full: boolean = false): Promise<void> => {
	try {
		const token = localStorage.getItem('token')
		if (!token) throw new Error('Токен отсутствует.')

		removeTokens()
		const response = await axios.delete(`${API_BASE_URL}/logout?full=${full}`, {
			headers: { Authorization: `Bearer ${token}` },
		})
		console.log('Выход выполнен успешно!', response.data)
	} catch (error) {
		throw handleError(error, 'Ошибка выхода')
	}
}

const handleError = (error: unknown, defaultMessage: string): Error => {
	if (axios.isAxiosError(error)) {
		console.error(`${defaultMessage}:`, error.response?.data)
		return new Error(error.response?.data?.message || defaultMessage)
	} else {
		console.error('Неожиданная ошибка:', error)
		return new Error('Неожиданная ошибка.')
	}
}
