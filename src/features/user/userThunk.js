import customFetch from '../../utils/axios'
import { clearAllJobsState } from '../allJobs/allJobsSlice'
import { logoutUser } from './userSlice'
import { clearJobForm } from '../job/job.Slice'

export const registerUserThunk = async (user, thunkAPI) => {
	try {
		const response = await customFetch.post('/auth/register', user) // await!!!
		// console.log(response)
		return response.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
}

export const loginUserThunk = async (user, thunkAPI) => {
	try {
		const response = await customFetch.post('auth/login', user) // await!!!
		// console.log(response)
		return response.data
	} catch (error) {
		// console.log(error)
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
}

export const updateUserThunk = async (user, thunkAPI) => {
	try {
		const response = await customFetch.patch('/auth/updateUser', user) // (await!!!) third: options is the headers, but we set it in axios interceptors
		// console.log(response)
		return response.data
	} catch (error) {
		if (error.response.status === 401) {
			// thunkAPI.dispatch(setAuthError())
			thunkAPI.dispatch(logoutUser())
			return thunkAPI.rejectWithValue('Unauthorized! Logging out...')
		}
		// console.log(error.response)
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
}

export const clearStoreThunk = async (message, thunkAPI) => {
	try {
		// logout user
		thunkAPI.dispatch(logoutUser(message))
		// clear jobs value
		thunkAPI.dispatch(clearAllJobsState())
		// clear job input values
		thunkAPI.dispatch(clearJobForm())
		return Promise.resolve()
	} catch (error) {
		// console.log(error);
		return Promise.reject()
	}
}
