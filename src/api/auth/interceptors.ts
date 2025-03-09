import axios from 'axios'
import { refreshToken } from './index'
import { removeTokens } from './tokens'

export const setupInterceptors = () => {
	axios.interceptors.response.use(
		response => response,
		async error => {
			const originalRequest = error.config

			if (error.config.url.includes('/')) {
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
					window.location.href = '/'
					return Promise.reject(refreshError)
				}
			}

			return Promise.reject(error)
		}
	)
}
