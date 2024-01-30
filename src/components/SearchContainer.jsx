import { FormRow, FormSelectRow } from '.'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useSelector, useDispatch } from 'react-redux'
import { clearValues, handelChange } from '../features/allJobs/allJobsSlice'
import { useState, useMemo } from 'react'

const SearchContainer = () => {
	const [localSearch, setLocalSearch] = useState('')
	const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
		useSelector(store => store.allJobs)

	const { jobTypeOptions, statusOptions } = useSelector(store => store.job)
	const dispatch = useDispatch()

	const handleSearch = e => {
		const name = e.target.name
		const value = e.target.value
		dispatch(handelChange({ name, value }))
	}
	const handleSubmit = e => {
		e.preventDefault()
		setLocalSearch('')
		dispatch(clearValues())
	}

	// debounced function
	const debounce = () => {
		console.log('bounce')
		let timeoutID
		return e => {
			setLocalSearch(e.target.value)
			clearTimeout(timeoutID)
			timeoutID = setTimeout(() => {
				dispatch(handelChange({ name: e.target.name, value: e.target.value }))
			}, 1000)
		}
	}

	// we use UseMemo to prevent rerendering
	const optimizedDebounce = useMemo(() => debounce(), [])

	return (
		<Wrapper>
			<form className='form'>
				<h4>search form</h4>
				<div className='form-center'>
					<FormRow
						type='text'
						name='search'
						value={localSearch}
						handleChange={optimizedDebounce}
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
