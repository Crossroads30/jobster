import customFetch from '../../utils/axios'
import { getAllJobs, hideLoading, showLoading } from '../allJobs/allJobsSlice'
import { logoutUser } from '../user/userSlice'
import { clearJobForm } from './job.Slice'

export const createJobThunk = async (job, thunkAPI) => {
	try {
		const response = await customFetch.post('/jobs', job, {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		})
		thunkAPI.dispatch(clearJobForm())
		return response.data
	} catch (error) {
		if (error.response.status === 401) {
			thunkAPI.dispatch(logoutUser())
			return thunkAPI.rejectWithValue('Unauthorized! Logging out...')
		}
	}
}

export const deleteJobThunk = async (jobId, thunkAPI) => {
	thunkAPI.dispatch(showLoading()) // we show loading from allJobsSlice
	try {
		const response = await customFetch.delete(`/jobs/${jobId}`, {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		})
		thunkAPI.dispatch(getAllJobs()) // we again get all jobs from server
		return response.data.msg // this data will be passed as payload to toast for success msg
	} catch (error) {
		thunkAPI.dispatch(hideLoading()) // if an error we hide loading from allJobsSlice
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
}

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
	try {
		const response = await customFetch.patch(`/jobs/${jobId}`, job, {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		})
		thunkAPI.dispatch(clearJobForm())
		return response.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
}
