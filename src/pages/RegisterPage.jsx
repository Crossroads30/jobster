import Wrapper from '../assets/wrappers/RegisterPage'
import { useState, useEffect } from 'react'
import { Logo } from '../components'
import { Button } from 'antd'

const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true,
}

const RegisterPage = () => {
	const [values, setValues] = useState(initialState)

	const handleChange = e => {
		console.log(e.target)
	}
	const handleSubmit = e => {
		e.preventDefault()
		console.log(e.target)
	}

	return (
		<Wrapper className='full-page'>
			<form className='form' onSubmit={handleSubmit}>
				<Logo />
				<h3>login</h3>
				{/* name field */}
				<div className='form-row'>
					<label htmlFor='name' className='form-label'>
						name
					</label>
					<input
						type='text'
						name='name'
						value={values.name}
						onChange={handleChange}
						className='form-input'
					/>
				</div>
        <button type='submit' className='btn btn-block'>submit</button>
			</form>
		</Wrapper>
	)
}
export default RegisterPage
