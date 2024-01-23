import Wrapper from '../assets/wrappers/RegisterPage'
import { useState, useEffect } from 'react'
import { Logo, FormRow } from '../components'
import { toast } from 'react-toastify'

const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true,
}

const RegisterPage = () => {
	const [values, setValues] = useState(initialState)

	const handleChange = e => {
		const name = e.target.name
		const value = e.target.value
		setValues({ ...values, [name]: value }) // dynamic keys values
	}
	const handleSubmit = e => {
		e.preventDefault()
		const {name, email,password,isMember} = values
		if (!email || !password || (!isMember && !name)) {
			toast.error('please fill out all fields')
		}
	}
	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember })
	}

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
				<button type='submit' className='btn btn-block'>
					submit
				</button>
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
