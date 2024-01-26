import customFetch from '../../utils/axios'
import { logoutUser, setAuthError } from '../user/userSlice'
import { clearJobForm } from './job.Slice'

export const createJobThunk = async (url, job, thunkAPI) => {
	try {
		const response = await customFetch.post(url, job, {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		})
		thunkAPI.dispatch(clearJobForm())
		return response.data
	} catch (error) {
		if (error.response.status === 401) {
			thunkAPI.dispatch(setAuthError())
			thunkAPI.dispatch(logoutUser())
			return thunkAPI.rejectWithValue('Unauthorized! Logging out...')
		}
	}
}
