import { createContext, useContext, useState } from 'react'

interface IState {
	isOpenMenu: boolean
	toggleMenu: () => void
}

export const Context = createContext<null | IState>(null)

export const BurgerProvider = ({ children }: { children: React.ReactNode }) => {
	const [isOpenMenu, setOpenMenu] = useState(false)

	const toggleMenu = () => {
		setOpenMenu(!isOpenMenu)
	}

	return (
		<Context.Provider value={{ isOpenMenu, toggleMenu }}>
			{children}
		</Context.Provider>
	)
}

export const useBurger = () => {
	const context = useContext(Context)
	if (!context) {
		throw new Error('Error')
	}
	return context as IState
}
