import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { FormRow } from '../../components'

const AddJob = () => {
	// const [jobData, setJobData] = useState({
	// 	position: positioon || '',
	// 	company: company || '',
	// 	jobLocation: jobLocation || '',
	// 	status: status || '',
	// 	jobType: jobType || '',
	// })

	const handleSubmit = e => {
		e.preventDefault()
		console.log('submit')
	}
	const handleChange = e => {
		const name = e.target.name
		const value = e.target.value
		console.log('change')
	}

	return (
		<Wrapper>
			<form onSubmit={handleSubmit} className='form'>
				<h3>add job</h3>
				<div className='form-center'>
					<FormRow
						type='text'
						name='position'
						value={''}
						handleChange={handleChange}
					/>
					<FormRow
						type='text'
						name='company'
						value={''}
						handleChange={handleChange}
					/>
					<FormRow
						type='text'
						name='jobLocation'
						labeltext='job location'
						value={''}
						handleChange={handleChange}
					/>
					<FormRow
						type='text'
						name='status'
						value={''}
						handleChange={handleChange}
					/>
					<FormRow
						type='text'
						name='jobType'
						labeltext='job type'
						value={''}
						handleChange={handleChange}
					/>
					<div className='btn-container'>
						<button
							type='button'
							className='btn clear-btn'
							onClick={() => console.log('clear')}
						>
							clear
						</button>
						<button type='submit' className='btn btn-block'>
							submit
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	)
}
export default AddJob
