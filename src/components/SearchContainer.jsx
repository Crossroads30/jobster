import { FormRow, FormSelectRow } from '.'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useSelector, useDispatch } from 'react-redux'
import { clearValues, handelChange } from '../features/allJobs/allJobsSlice'

const SearchContainer = () => {
	const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
		useSelector(store => store.allJobs)

	const { jobTypeOptions, statusOptions } = useSelector(store => store.job)
	const dispatch = useDispatch()

	const handleSearch = e => {
		const name = e.target.name
		const value = e.target.value
		if(isLoading) {
			return
		}
		dispatch(handelChange({name, value}))
	}
	const handleSubmit = e => {
		e.preventDefault()
		dispatch(clearValues())
	}
	return (
		<Wrapper>
			<form className='form'>
				<h4>search form</h4>
				<div className='form-center'>
					<FormRow
						type='text'
						name='search'
						value={search}
						handleChange={handleSearch}
					/>
					<FormSelectRow
						labeltext='status'
						name='searchStatus'
						value={searchStatus}
						handleChange={handleSearch}
						list={['all', ...statusOptions]}
					/>
					<FormSelectRow
						labeltext='type'
						name='searchType'
						value={searchType}
						handleChange={handleSearch}
						list={['all', ...jobTypeOptions]}
					/>
					<FormSelectRow
						name='sort'
						value={sort}
						handleChange={handleSearch}
						list={sortOptions}
					/>
					<button
						className='btn btn-block btn-danger'
						disabled={isLoading}
						onClick={handleSubmit}
					>
						clear filters
					</button>
				</div>
			</form>
		</Wrapper>
	)
}
export default SearchContainer
