export interface IMessage {
	id: string
	content: string
	sender: {
		email: string
		username: string
	}
	createdAt: string
	updatedAt: string
}

export interface IUser {
	id: string
	username: string
	email: string
	avatar?: string
	createdAt: string
	updatedAt: string
	referalCode: string
	role: {
		id: string
		name: string
	}
}

