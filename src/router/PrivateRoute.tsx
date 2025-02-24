import { useAuth } from '@/Context/AuthProvider'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const PrivateRoute = () => {
	const { isAuthenticated, toggleAuth } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!isAuthenticated) {
			toggleAuth()
			navigate(-1)
		}
	}, [isAuthenticated, toggleAuth, navigate])

	return isAuthenticated ? <Outlet /> : null
}
