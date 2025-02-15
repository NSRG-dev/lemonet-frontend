import { icons } from '@/assets'
import { Suspense, useState } from 'react'
import { HeaderForm } from '../HeaderForm/HeaderForm'
import { Button, Input, Modal, Tabs } from '../ui'
import s from './Auth.module.scss'

export const Auth = () => {
	const [isTab, setTab] = useState('Login')
	const [isOpenCode, setOpenCode] = useState(false)

	const renderReferralCodeSection = () => (
		<div className={s.tab}>
			<div className={s.label}>
				<span>
					<img src={icons.code} alt='code' loading='lazy' />
					Do you have code?
				</span>
				<button onClick={() => setOpenCode(prev => !prev)}>
					<img
						src={icons.arrow}
						alt='arrow'
						className={isOpenCode ? s.rotated : ''}
					/>
				</button>
			</div>
			<div className={`${s.input} ${isOpenCode ? s.open : ''}`}>
				<Input
					label='Your password'
					placeholder='Enter referral code'
					open={true}
				/>
			</div>
		</div>
	)

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Modal className={s.auth}>
				<HeaderForm
					title={isTab === 'Login' ? 'Log In' : 'Sign Up'}
					subtitle={
						isTab === 'Login'
							? 'Welcome back, let’s play!'
							: 'Join the game, start winning!'
					}
				/>
				<Tabs tabs={['Sign up', 'Login']} onClick={setTab} isTab={isTab} newClass={s.tabs} />
				<form className={s.form}>
					{isTab === 'Login' ? null : (
						<Input label='Your username' placeholder='Enter your username' />
					)}
					<Input label='Your e-mail' placeholder='Enter your e-mail' />
					<Input label='Your password' placeholder='Enter your password' />
				</form>
				<a href='#'>Forgot password?</a>
				{isTab === 'Login' ? null : (
					<>
						{renderReferralCodeSection()}
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
				<Button type='default'>
					{isTab === 'Login' ? 'LOG IN' : 'SIGN UP'}
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
