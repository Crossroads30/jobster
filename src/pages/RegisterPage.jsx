import Wrapper from '../assets/wrappers/RegisterPage'
import { useState, useEffect } from 'react'
import { Logo, FormRow } from '../components'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true,
}

const RegisterPage = () => {
	const [values, setValues] = useState(initialState)
	const { user, isLoading } = useSelector(store => store.user)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleChange = e => {
		const name = e.target.name
		const value = e.target.value
		setValues({ ...values, [name]: value }) // dynamic keys values
	}
	const handleSubmit = e => {
		e.preventDefault()
		const { name, email, password, isMember } = values
		if (!email || !password || (!isMember && !name)) {
			toast.error('please fill out all fields')
			return
		}
		if (isMember) {
			dispatch(loginUser({ email: email, password: password })) // long way
			return
		}
		dispatch(registerUser({ name, email, password })) // short ES6 way
	}
	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember })
	}

	useEffect(() => {
		if (user) {
			// const timeout = setTimeout(() => {
			// 	navigate('/')
			// }, 1000)
			// return () => clearTimeout(timeout)
			navigate('/')
		}
	}, [user])

	return (
		<Wrapper className='full-page'>
			<form className='form' onSubmit={handleSubmit}>
				<Logo />
				<h3>{values.isMember ? 'login' : 'register'}</h3>
				{/* name field */}
				{!values.isMember && (
					<FormRow
						type='text'
						name='name'
						value={values.name}
						handleChange={handleChange}
						onChange={handleChange}
					/>
				)}

				{/* email field */}
				<FormRow
					type='email'
					name='email'
					value={values.email}
					handleChange={handleChange}
					onChange={handleChange}
				/>
				{/* password field */}
				<FormRow
					type='password'
					name='password'
					value={values.password}
					handleChange={handleChange}
					onChange={handleChange}
				/>
				{isLoading ? (
					<Button type='primary' loading className='btn btn-block'>
						Loading
					</Button>
				) : (
					<>
						<button
							type='submit'
							className='btn btn-block'
							disabled={isLoading}
						>
							submit
						</button>
						<button
							type='button'
							className='btn btn-block btn-hipster'
							disabled={isLoading}
							onClick={() =>
								dispatch(
									loginUser({ email: 'testUser@test.com', password: 'secret' })
								)
							}
						>
							demo
						</button>
					</>
				)}
				<p>
					{values.isMember ? 'Not a member yet?' : 'Already a member?'}
					<button type='button' onClick={toggleMember} className='member-btn'>
						{values.isMember ? 'Register' : 'Login'}
					</button>
				</p>
			</form>
		</Wrapper>
	)
}
export default RegisterPage
