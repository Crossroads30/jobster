import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage, DashboardPage, ErrorPage, RegisterPage } from './pages'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<DashboardPage />} />
				<Route path='/landing' element={<LandingPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
			<ToastContainer position='top-center' autoClose={3000} />
		</BrowserRouter>
	)
}
export default App
