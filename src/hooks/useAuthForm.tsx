import { siginUser, signupUser } from '@/api/auth'
import { saveTokens } from '@/api/auth/tokens'
import { useAuth } from '@/Context/AuthProvider'
import { useCallback, useState } from 'react'

export const useAuthForm = () => {
	const {
		setIsRegistered,
		setIsAuthenticated,
		closeAuth,
		email,
		setEmail,
		password,
		setPassword,
		username,
		setUsername,
	} = useAuth()
	const [errors, setErrors] = useState<{ [key: string]: string }>({})

	const validateForm = (isSignUp: boolean) => {
		const newErrors: { [key: string]: string } = {}

		if (!email) newErrors.email = 'Email is required'
		else if (!/\S+@\S+\.\S+/.test(email))
			newErrors.email = 'Invalid email format'

		if (!password) newErrors.password = 'Password is required'
		else if (password.length < 6)
			newErrors.password = 'Password must be at least 6 characters'

		if (isSignUp) {
			if (!username) newErrors.username = 'Username is required'
			else if (username.length < 3)
				newErrors.username = 'Username must be at least 3 characters'
			else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
				newErrors.username =
					'Username can only contain letters, numbers, and underscores'
			}
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleCreateAccount = useCallback(
		async (
			e: React.MouseEvent<HTMLButtonElement>,
			setTab: React.Dispatch<React.SetStateAction<'Login' | 'Sign up'>>
		) => {
			e.preventDefault()
			if (!validateForm(true)) return

			try {
				const response = await signupUser({ email, password, username })
				saveTokens(response.accessToken, response.refreshToken)
				setUsername(username)
				setIsRegistered(true)
				setIsAuthenticated(true)
				setTab('Login')
				closeAuth()
			} catch (error) {
				console.error('Ошибка регистрации:', error)
				alert('Ошибка регистрации. Проверьте введенные данные.')
			}
		},
		[
			email,
			password,
			username,
			setIsRegistered,
			setIsAuthenticated,
			closeAuth,
			setUsername,
		]
	)

	const handleLoginAccount = useCallback(
		async (
			e: React.MouseEvent<HTMLButtonElement>,
			setTab: React.Dispatch<React.SetStateAction<'Login' | 'Sign up'>>
		) => {
			e.preventDefault()
			if (!validateForm(false)) return

			try {
				const response = await siginUser({ email, password })
				saveTokens(response.accessToken, response.refreshToken)
				setIsRegistered(true)
				setIsAuthenticated(true)
				setTab('Login')
				closeAuth()
			} catch (error) {
				console.error('Ошибка входа:', error)
				alert('Ошибка входа. Проверьте введенные данные.')
			}
		},
		[email, password, setIsRegistered, setIsAuthenticated, closeAuth]
	)

	return {
		email,
		setEmail,
		password,
		setPassword,
		username,
		setUsername,
		errors,
		handleCreateAccount,
		handleLoginAccount,
	}
}
