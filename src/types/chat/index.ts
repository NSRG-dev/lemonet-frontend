export interface IChat {
	id: string
	time: string
	avatarSrc: string
	username: string
	prefix?: string
	message: string
	muted: boolean
	color?: string
}
