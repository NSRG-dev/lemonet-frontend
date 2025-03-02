export interface RegisterData {
	email: string
	password: string
	username: string
	referralCode?: string
}

export interface LoginData {
	email: string
	password: string
}

export interface AuthResponse {
	accessToken: string
	refreshToken: string
	user: {
		id: string
		email: string
	}
}

export const API_BASE_URL = 'http://localhost:3000/api/auth'
