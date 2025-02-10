import { Outlet } from 'react-router-dom'
import { Chat } from './components/Chat/Chat'
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
				</div>
				<Chat />
			</div>
		</div>
	)
}

export default App
