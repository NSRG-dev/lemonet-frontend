export interface IMessage {
	id: string
	avatarSrc: string
	username: string
	time: string
	message: string
	prefix?: string
	color?: string
	muted?: boolean
	dopMessage?: string
}

export interface IUser {
	id: string
	username: string
	email: string
	avatar?: string 
	createdAt: string
	updatedAt: string
	role: {
		id: string
		name: string
	}
}

export const API_BASE_CHAT_URL = 'http://localhost:3000/api'
