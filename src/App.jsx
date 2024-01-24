import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage, ErrorPage, RegisterPage, ProtectedRoute } from './pages'
import {
	AddJob,
	AllJobs,
	Profile,
	SharedLayout,
	Stats,
} from './pages/dashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<SharedLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Stats />} />
					<Route path='/all-jobs' element={<AllJobs />} />
					<Route path='/add-job' element={<AddJob />} />
					<Route path='/profile' element={<Profile />} />
				</Route>
				<Route path='/landing' element={<LandingPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
			<ToastContainer position='top-center' autoClose={3000} />
		</BrowserRouter>
	)
}
export default App
