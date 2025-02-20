import { Outlet } from 'react-router-dom'
import { Auth } from './components/Auth/Auth'
import { Chat } from './components/Chat/Chat'
import { DepositForm } from './components/DepositForm/DepositForm'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Sidebar } from './components/Sidebar/Sidebar'

const App = () => {
	return (
		<div className='container'>
			<Header />
			<div className='content'>
				<Sidebar />
				<div className='content-section'>
					<Outlet />
					<Footer />
				</div>
				<Chat />
			</div>
			<DepositForm />
			<Auth />
		</div>
	)
}

export default App
