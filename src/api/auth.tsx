import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api/auth'

interface RegisterData {
	email: string
	password: string
}

interface LoginData {
	email: string
	password: string
}

interface AuthResponse {
	accessToken: string
	refreshToken: string
	user: {
		id: string
		email: string
	}
}

export const saveTokens = (accessToken: string, refreshToken: string) => {
	localStorage.setItem('token', accessToken)
	localStorage.setItem('refreshToken', refreshToken)
}

export const removeTokens = () => {
	localStorage.removeItem('token')
	localStorage.removeItem('refreshToken')
}

export const isAuthenticated = (): boolean => {
	const token = localStorage.getItem('token')
	return !!token
}

export const signupUser = async (data: RegisterData): Promise<AuthResponse> => {
	try {
		const response = await axios.post<AuthResponse>(
			`${API_BASE_URL}/sign-up`,
			data
		)
		saveTokens(response.data.accessToken, response.data.refreshToken)
		console.log('Регистрация прошла успешно!', response.data)
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Ошибка регистрации:', error.response?.data)
			throw new Error(error.response?.data?.message || 'Ошибка регистрации.')
		} else {
			console.error('Неожиданная ошибка:', error)
			throw new Error('Неожиданная ошибка.')
		}
	}
}

export const siginUser = async (data: LoginData): Promise<AuthResponse> => {
	try {
		const response = await axios.post<AuthResponse>(
			`${API_BASE_URL}/sign-in`,
			data
		)
		saveTokens(response.data.accessToken, response.data.refreshToken)
		console.log('Вход выполнен успешно!', response.data)
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Ошибка входа:', error.response?.data)
			throw new Error(error.response?.data?.message || 'Ошибка входа.')
		} else {
			console.error('Неожиданная ошибка:', error)
			throw new Error('Неожиданная ошибка.')
		}
	}
}

export const refreshToken = async (): Promise<AuthResponse> => {
	try {
		const refreshToken = localStorage.getItem('refreshToken')
		if (!refreshToken) {
			throw new Error('Refresh token отсутствует.')
		}

		const response = await axios.post<AuthResponse>(`${API_BASE_URL}/refresh`, {
			refreshToken,
		})

		saveTokens(response.data.accessToken, response.data.refreshToken)
		console.log('Токен обновлен успешно!', response.data)
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Ошибка обновления токена:', error.response?.data)
			throw new Error(
				error.response?.data?.message || 'Ошибка обновления токена.'
			)
		} else {
			console.error('Неожиданная ошибка:', error)
			throw new Error('Неожиданная ошибка.')
		}
	}
}

axios.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		if (error.config.url.includes('/logout')) {
			return Promise.reject(error)
		}

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			try {
				const newTokens = await refreshToken()
				axios.defaults.headers.common[
					'Authorization'
				] = `Bearer ${newTokens.accessToken}`
				originalRequest.headers[
					'Authorization'
				] = `Bearer ${newTokens.accessToken}`
				return axios(originalRequest)
			} catch (refreshError) {
				console.error('Ошибка обновления токена:', refreshError)
				removeTokens()
				window.location.href = '/slots'
				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	}
)

export const logoutUser = async (full: boolean = false) => {
	try {
		const token = localStorage.getItem('token')
		if (!token) {
			throw new Error('Токен отсутствует.')
		}

		removeTokens()

		const response = await axios.delete(`${API_BASE_URL}/logout?full=${full}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		console.log('Выход выполнен успешно!', response.data)
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Ошибка выхода:', error.response?.data)
			throw new Error(error.response?.data?.message || 'Ошибка выхода.')
		} else {
			console.error('Неожиданная ошибка:', error)
			throw new Error('Неожиданная ошибка.')
		}
	}
}
