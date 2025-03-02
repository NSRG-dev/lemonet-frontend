import { icons } from '@/assets'
import { useAuth } from '@/Context/AuthProvider'
import { useAuthForm } from '@/hooks/useAuthForm'
import { Suspense, useState } from 'react'
import { HeaderForm } from '../HeaderForm/HeaderForm'
import { RenderReferralCodeSection } from '../RenderReferralCodeSection/RenderReferralCodeSection'
import { Button, Input, Modal, Tabs } from '../ui'
import s from './Auth.module.scss'

export const Auth = () => {
	const [isTab, setTab] = useState<'Login' | 'Sign up'>('Login')
	const [isOpenCode, setOpenCode] = useState(false)
	const {
		isOpenAuth,
		toggleAuth,
		isRegistered,
		email,
		setEmail,
		password,
		setPassword,
		username,
		setUsername,
	} = useAuth()
	const {
		errors,
		handleCreateAccount,
		handleLoginAccount,
		referralCode,
		setReferralCode,
	} = useAuthForm()

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
					onClick={value => setTab(value)}
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
							error={errors.username}
						/>
					)}
					<Input
						label='Your e-mail'
						placeholder='Enter your e-mail'
						value={email}
						onChange={e => setEmail(e.target.value)}
						error={errors.email}
					/>
					<Input
						label='Your password'
						placeholder='Enter your password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						error={errors.password}
					/>
				</form>
				<a href='#'>Forgot password?</a>
				{isTab === 'Sign up' && (
					<>
						<RenderReferralCodeSection
							setOpenCode={setOpenCode}
							isOpenCode={isOpenCode}
							referralCode={referralCode}
							setReferralCode={setReferralCode}
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
					onClick={
						isTab === 'Login'
							? e => handleLoginAccount(e, setTab)
							: e => handleCreateAccount(e, setTab)
					}
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
