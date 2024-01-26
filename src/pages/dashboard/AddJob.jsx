import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { FormRow } from '../../components'
import { toast } from 'react-toastify'
import FormSelectRow from '../../components/FormSelectRow'
import { handleChange, clearJobForm } from '../../features/job/job.Slice'

const AddJob = () => {
	const {
		isLoading,
		isEditing,
		position,
		company,
		jobLocation,
		jobType,
		jobTypeOptions,
		status,
		statusOptions,
		editJobId,
	} = useSelector(store => store.job)
	const dispatch = useDispatch()

	const handleSubmit = e => {
		e.preventDefault()
		if (!position || !company || !jobLocation) {
			toast.error('please fill out all fields')
		}
		console.log('submit')
	}
	const handleJobInput = e => {
		const name = e.target.name
		const value = e.target.value
		dispatch(handleChange({ name, value })) // we pass the object!
	}

	return (
		<Wrapper>
			<form onSubmit={handleSubmit} className='form'>
				<h3>{isEditing ? 'edit job' : 'add job'}</h3>
				<div className='form-center'>
					{/* Position */}
					<FormRow
						type='text'
						name='position'
						value={position}
						handleChange={handleJobInput}
					/>
					{/* Company */}
					<FormRow
						type='text'
						name='company'
						value={company}
						handleChange={handleJobInput}
					/>
					{/* Job location */}
					<FormRow
						type='text'
						name='jobLocation'
						labeltext='job location'
						value={jobLocation}
						handleChange={handleJobInput}
					/>
					{/* Status */}
					<FormSelectRow
						name='status'
						value={status}
						list={statusOptions}
						handleChange={handleJobInput}
					/>
					{/* Job type */}
					<FormSelectRow
						name='jobType'
						labeltext='job Type'
						value={jobType}
						list={jobTypeOptions}
						handleChange={handleJobInput}
					/>
					{/* Button container */}
					<div className='btn-container'>
						<button
							type='button'
							className='btn btn-block clear-btn'
							onClick={() => dispatch(clearJobForm())}
						>
							clear
						</button>
						<button
							type='submit'
							className='btn btn-block submit-btn'
							onClick={handleSubmit}
							disabled={isLoading}
						>
							submit
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	)
}
export default AddJob
