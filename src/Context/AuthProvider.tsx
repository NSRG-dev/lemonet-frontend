import { createContext, useContext, useState } from 'react'

interface IState {
	isOpenDeposit: boolean
	isOpenAuth: boolean
	isRegistered: boolean
	toggleAuth: () => void
	toggleDeposit: () => void
	setIsRegistered: (value: boolean) => void
}

export const Context = createContext<null | IState>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isOpenDeposit, setOpenDeposit] = useState(false)
	const [isOpenAuth, setOpenAuth] = useState(false)
	const [isRegistered, setIsRegistered] = useState(false)

	const toggleAuth = () => {
		setOpenAuth(!isOpenAuth)
	}

	const toggleDeposit = () => {
		setOpenDeposit(!isOpenDeposit)
	}

	return (
		<Context.Provider
			value={{
				isOpenAuth,
				toggleDeposit,
				toggleAuth,
				isOpenDeposit,
				isRegistered,
				setIsRegistered,
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
