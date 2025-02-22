import axios from 'axios'

interface RegisterData {
	email: string
	password_hash: string
}

interface LoginData {
	email: string
	password_hash: string
}

export const registerUser = async (data: RegisterData) => {
	try {
		const response = await axios.post(
			'https://llm.runpay.com/transcripto_test/auth/register',
			data
		)
		return response.data
	} catch (error) {
		console.error('Error registering user:', error)
		throw new Error('Ошибка регистрации. Проверьте введенные данные.')
	}
}

export const loginUser = async (data: LoginData) => {
	try {
		const response = await axios.post(
			'https://llm.runpay.com/transcripto_test/auth/login',
			data
		)
		return response.data
	} catch (error) {
		console.error('Error logging in:', error)
		throw new Error('Ошибка входа. Проверьте введенные данные.')
	}
}
