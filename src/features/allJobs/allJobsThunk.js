import customFetch from '../../utils/axios'

export const getAllJobsThunk = async (_, thunkAPI) => {
	const { page, search, searchStatus, searchType, sort } =
		thunkAPI.getState().allJobs
	let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
	if (search) {
		url = url + `&search=${search}`
	}
	try {
		const response = await customFetch.get(url)
		// console.log(response.data)
		return response.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
}

export const showStatsThunk = async (_, thunkAPI) => {
	try {
		const response = await customFetch.get('/jobs/stats')
		// console.log(response.data)
		return response.data
	} catch (error) {
		console.log(error)
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
}
