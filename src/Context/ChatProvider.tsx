import { createContext, useContext, useState } from 'react'

interface IState {
	isOpenChat: boolean
	toggleChat: () => void
}

export const Context = createContext<null | IState>(null)

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
	const [isOpenChat, setOpenMenu] = useState(true)

	const toggleChat = () => {
		setOpenMenu(!isOpenChat)
	}

	return (
		<Context.Provider value={{ isOpenChat, toggleChat }}>
			{children}
		</Context.Provider>
	)
}

export const useChat = () => {
	const context = useContext(Context)
	if (!context) {
		throw new Error('Error')
	}
	return context as IState
}
