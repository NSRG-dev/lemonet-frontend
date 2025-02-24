export const saveTokens = (accessToken: string, refreshToken: string) => {
	localStorage.setItem('token', accessToken)
	localStorage.setItem('refreshToken', refreshToken)
}

export const removeTokens = () => {
	localStorage.removeItem('token')
	localStorage.removeItem('refreshToken')
}

export const saveUsername = (username: string) => {
	localStorage.setItem('username', username)
}

export const getUsername = (): string | null => {
	return localStorage.getItem('username')
}

export const saveEmail = (email: string) => {
	localStorage.setItem('email', email)
}

export const getEmail = (): string | null => {
	return localStorage.getItem('email')
}

export const isAuthenticated = (): boolean => {
	const token = localStorage.getItem('token')
	return !!token
}
