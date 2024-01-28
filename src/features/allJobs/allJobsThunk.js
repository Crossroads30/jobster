import customFetch from '../../utils/axios'

export const getAllJobsThunk = async (url, _, thunkAPI) => {
	try {
		const response = await customFetch.get(url)
		// console.log(response.data)
		return response.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
}
