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
	token: string
	user: {
		id: string
		email: string
	}
}

const saveToken = (token: string) => {
	localStorage.setItem('token', token)
}

const removeToken = () => {
	localStorage.removeItem('token')
}

export const isAuthenticated = (): boolean => {
	const token = localStorage.getItem('token')
	return !!token
}

export const registerUser = async (
	data: RegisterData
): Promise<AuthResponse> => {
	try {
		const response = await axios.post<AuthResponse>(
			`${API_BASE_URL}/sign-up`,
			data
		)
		saveToken(response.data.token) 
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Error registering user:', error.response?.data)
			throw new Error(
				error.response?.data?.message ||
					'Ошибка регистрации. Проверьте введенные данные.'
			)
		} else {
			console.error('Unexpected error:', error)
			throw new Error('Неожиданная ошибка.')
		}
	}
}

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
	try {
		const response = await axios.post<AuthResponse>(
			`${API_BASE_URL}/sign-in`,
			data
		)
		saveToken(response.data.token) 
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Error logging in:', error.response?.data)
			throw new Error(
				error.response?.data?.message ||
					'Ошибка входа. Проверьте введенные данные.'
			)
		} else {
			console.error('Unexpected error:', error)
			throw new Error('Неожиданная ошибка.')
		}
	}
}

export const logoutUser = async () => {
	try {
		const token = localStorage.getItem('token')
		const response = await axios.post(
			`${API_BASE_URL}/logout`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		removeToken() 
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Error logging out:', error.response?.data)
			throw new Error(error.response?.data?.message || 'Ошибка выхода.')
		} else {
			console.error('Unexpected error:', error)
			throw new Error('Неожиданная ошибка.')
		}
	}
}
