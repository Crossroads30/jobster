import customFetch from '../../utils/axios'

export const getAllJobsThunk = async (_, thunkAPI) => {
	let url = `/jobs`
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