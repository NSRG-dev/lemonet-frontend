import axios, { AxiosResponse } from 'axios'
import { setupInterceptors } from './interceptors'
import { removeTokens, saveEmail, saveTokens, saveUsername } from './tokens'
import {
	API_BASE_URL,
	type AuthResponse,
	type LoginData,
	type RegisterData,
} from './types'

setupInterceptors()

const handleRequest = async <T>(
	request: () => Promise<AxiosResponse<T>>,
	successMessage: string,
	errorMessage: string,
	onSuccess?: (data: T) => void
): Promise<T> => {
	try {
		const response: AxiosResponse<T> = await request()
		console.log(successMessage, response.data)
		if (onSuccess) onSuccess(response.data)
		return response.data
	} catch (error) {
		throw handleError(error, errorMessage)
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

const saveUserData = (data: { username?: string; email?: string }): void => {
	if (data.username) saveUsername(data.username)
	if (data.email) saveEmail(data.email)
}

export const signupUser = async (data: RegisterData): Promise<AuthResponse> => {
	return handleRequest<AuthResponse>(
		() => axios.post<AuthResponse>(`${API_BASE_URL}/sign-up`, data),
		'Регистрация прошла успешно!',
		'Ошибка регистрации',
		(response: AuthResponse) => {
			removeTokens()
			saveTokens(response.accessToken, response.refreshToken)
			saveUserData(data)
		}
	)
}

export const siginUser = async (data: LoginData): Promise<AuthResponse> => {
	return handleRequest<AuthResponse>(
		() => axios.post<AuthResponse>(`${API_BASE_URL}/sign-in`, data),
		'Вход выполнен успешно!',
		'Ошибка входа',
		(response: AuthResponse) => {
			removeTokens()
			saveTokens(response.accessToken, response.refreshToken)
			saveUserData({ email: data.email })
		}
	)
}

export const refreshToken = async (): Promise<AuthResponse> => {
	const refreshToken: string | null = localStorage.getItem('refreshToken')
	if (!refreshToken) {
		window.location.href = '/'
		throw new Error('Refresh token отсутствует.')
	}

	return handleRequest<AuthResponse>(
		() => axios.post<AuthResponse>(`${API_BASE_URL}/refresh`, { refreshToken }),
		'Токен обновлен успешно!',
		'Ошибка обновления токена',
		(response: AuthResponse) => {
			saveTokens(response.accessToken, response.refreshToken)
		}
	)
}

export const logoutUser = async (full: boolean = false): Promise<void> => {
	const token: string | null = localStorage.getItem('token')
	if (!token) throw new Error('Токен отсутствует.')

	return handleRequest<void>(
		() =>
			axios.delete(`${API_BASE_URL}/logout?full=${full}`, {
				headers: { Authorization: `Bearer ${token}` },
			}),
		'Выход выполнен успешно!',
		'Ошибка выхода',
		() => {
			removeTokens()
		}
	)
}
