import { icons } from '@/assets'
import { useAuth } from '@/Context/AuthProvider'
import { Suspense, useCallback, useState } from 'react'
import { HeaderForm } from '../HeaderForm/HeaderForm'
import { RenderReferralCodeSection } from '../RenderReferralCodeSection/RenderReferralCodeSection'
import { Button, Input, Modal, Tabs } from '../ui'
import s from './Auth.module.scss'
import { siginUser, signupUser } from '@/api/auth/index'
import { saveTokens } from '@/api/auth/tokens'

export const Auth = () => {
	const [isTab, setTab] = useState<'Login' | 'Sign up'>('Login')
	const [isOpenCode, setOpenCode] = useState(false)
	const {
		isOpenAuth,
		toggleAuth,
		isRegistered,
		setIsRegistered,
		closeAuth,
		setIsAuthenticated,

		email,
		setEmail,
		password,
		setPassword,
		username,
		setUsername,
	} = useAuth()

	const handleCreateAccount = useCallback(
		async (e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault()
			if (!email || !password || !username) {
				alert('Пожалуйста, заполните все поля.')
				return
			}
			try {
				const response = await signupUser({
					email,
					password,
					username,
				})
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
		async (e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault()
			if (!email || !password) {
				alert('Пожалуйста, заполните все поля.')
				return
			}
			try {
				const response = await siginUser({
					email,
					password,
				})
				saveTokens(response.accessToken, response.refreshToken)
				setIsRegistered(true)
				setIsAuthenticated(true)
				closeAuth()
			} catch (error) {
				console.error('Ошибка входа:', error)
				alert('Ошибка входа. Проверьте введенные данные.')
			}
		},
		[email, password, setIsRegistered, setIsAuthenticated, closeAuth]
	)

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Modal className={s.auth} isOpen={isOpenAuth}>
				<HeaderForm
					title={isTab === 'Login' ? 'Log In' : 'Sign Up'}
					subtitle={
						isTab === 'Login'
							? 'Welcome back, let’s play!'
							: 'Join the game, start winning!'
					}
					onClose={toggleAuth}
				/>
				<Tabs
					tabs={['Sign up', 'Login']}
					onClick={setTab}
					isTab={isTab}
					newClass={s.tabs}
				/>
				<form className={s.form}>
					{isTab === 'Sign up' && (
						<Input
							label='Your username'
							placeholder='Enter your username'
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
					)}
					<Input
						label='Your e-mail'
						placeholder='Enter your e-mail'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Input
						label='Your password'
						placeholder='Enter your password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</form>
				<a href='#'>Forgot password?</a>
				{isTab === 'Sign up' && (
					<>
						<RenderReferralCodeSection
							setOpenCode={setOpenCode}
							isOpenCode={isOpenCode}
						/>
						<div className={s.checked}>
							<Button type='green'>
								<img src={icons.checkbox} alt='check' loading='lazy' />
							</Button>
							<p>
								I agree to the <span>User Agreement</span> & confirm I am at
								least 18 years old
							</p>
						</div>
					</>
				)}
				<Button
					type='default'
					onClick={isTab === 'Login' ? handleLoginAccount : handleCreateAccount}
				>
					{isRegistered ? 'LOG IN' : 'SIGN UP'}
				</Button>
				<span>OR</span>
				<div className={s.btns}>
					{[icons.google, icons.telegram, icons.facebook].map((btn, index) => (
						<Button key={index} type='icon'>
							<img src={btn} alt='btn' loading='lazy' />
						</Button>
					))}
				</div>
			</Modal>
		</Suspense>
	)
}
