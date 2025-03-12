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
