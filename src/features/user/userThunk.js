import customFetch from '../../utils/axios'
import { logoutUser, setAuthError } from './userSlice'

export const registerUserThunk = async (url, user, thunkAPI) => {
	try {
		const response = await customFetch.post(url, user) // await!!!
		// console.log(response)
		return response.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
}

export const loginUserThunk = async (url, user, thunkAPI) => {
	try {
		const response = await customFetch.post(url, user) // await!!!
		// console.log(response)
		return response.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
}

export const updateUserThunk = async (url, user, thunkAPI) => {
	try {
		const response = await customFetch.patch(url, user, {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		}) // (await!!!) third: options
		// console.log(response)
		return response.data
	} catch (error) {
		if (error.response.status === 401) {
			thunkAPI.dispatch(setAuthError())
			thunkAPI.dispatch(logoutUser())
			return thunkAPI.rejectWithValue('Unauthorized! Logging out...')
		}
		// console.log(error.response)
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
}
