import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage, DashboardPage, ErrorPage, RegisterPage } from './pages'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<DashboardPage />} />
				<Route path='/landing' element={<LandingPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	)
}
export default App
