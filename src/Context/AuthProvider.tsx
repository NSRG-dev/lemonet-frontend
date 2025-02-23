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
}

export const Context = createContext<null | IState>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isOpenDeposit, setOpenDeposit] = useState(false)
	const [isOpenAuth, setOpenAuth] = useState(false)
	const [isRegistered, setIsRegistered] = useState(false)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			setIsAuthenticated(true)
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
