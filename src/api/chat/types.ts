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
