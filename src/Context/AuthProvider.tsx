import { createContext, useContext, useEffect, useState } from 'react'

interface IState {
	isOpenDeposit: boolean
	isOpenAuth: boolean
	isRegistered: boolean
	isAuthenticated: boolean
	toggleAuth: () => void
	toggleDeposit: () => void
	setIsRegistered: (value: boolean) => void
	closeAuth: () => void
	setIsAuthenticated: (value: boolean) => void
	logout: () => void

	email: string
	password: string
	setEmail: (value: string) => void
	setPassword: (value: string) => void
	setUsername: (value: string) => void
	username: string
}

export const Context = createContext<null | IState>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isOpenDeposit, setOpenDeposit] = useState(false)
	const [isOpenAuth, setOpenAuth] = useState(false)
	const [isRegistered, setIsRegistered] = useState(false)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			setIsAuthenticated(true)
			setUsername(localStorage.getItem('username') || '')
			setEmail(localStorage.getItem('email') || '')
		}
	}, [])

	const toggleAuth = () => {
		setOpenAuth(!isOpenAuth)
	}

	const toggleDeposit = () => {
		setOpenDeposit(!isOpenDeposit)
	}

	const closeAuth = () => {
		setOpenAuth(false)
	}

	const logout = () => {
		setIsAuthenticated(false)
		localStorage.removeItem('token')
		localStorage.removeItem('username')
		localStorage.removeItem('email')
		console.log('Выход выполнен успешно!')
	}

	return (
		<Context.Provider
			value={{
				isOpenAuth,
				toggleDeposit,
				toggleAuth,
				closeAuth,
				isOpenDeposit,
				isRegistered,
				setIsRegistered,
				isAuthenticated,
				setIsAuthenticated,
				logout,

				email,
				password,
				setEmail,
				setPassword,
				setUsername,
				username,
			}}
		>
			{children}
		</Context.Provider>
	)
}
export const useAuth = () => {
	const context = useContext(Context)
	if (!context) {
		throw new Error('Error')
	}
	return context as IState
}
