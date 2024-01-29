import { authHeader } from '../../utils/authHeader'
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios'
import { getAllJobs, hideLoading, showLoading } from '../allJobs/allJobsSlice'
import { clearJobForm } from './job.Slice'

// Way1 - we can pass headers as separate function from this file:
// const authHeader = thunkAPI => {
// 	return {
// 		headers: {
// 			authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
// 		},
// 	}}

//Way2 - we can pass headers as separate function from other file(authHeader.js)

//Way3 - we can set it in customFetch as axios interceptors
//for way3 we must remove all 'headers' from thunks as we set it in axios

export const createJobThunk = async (job, thunkAPI) => {
	try {
		// Way1
		const response = await customFetch.post('/jobs', job)
		thunkAPI.dispatch(clearJobForm())
		return response.data
	} catch (error) {
		return checkForUnauthorizedResponse(error, thunkAPI)
	}
}

export const deleteJobThunk = async (jobId, thunkAPI) => {
	thunkAPI.dispatch(showLoading()) // we show loading from allJobsSlice
	try {
		const response = await customFetch.delete(`/jobs/${jobId}`)
		thunkAPI.dispatch(getAllJobs()) // we again get all jobs from server
		return response.data.msg // this data will be passed as payload to toast for success msg
	} catch (error) {
		thunkAPI.dispatch(hideLoading()) // if an error we hide loading from allJobsSlice
		return checkForUnauthorizedResponse(error, thunkAPI)
	}
}

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
	try {
		const response = await customFetch.patch(`/jobs/${jobId}`, job)
		thunkAPI.dispatch(clearJobForm())
		return response.data
	} catch (error) {
		return checkForUnauthorizedResponse(error, thunkAPI)
	}
}


// example with headers in thunk
// export const createJobThunk = async (job, thunkAPI) => {
// 	try {
// 		const response = await customFetch.post('/jobs', job, {
// 			headers: {
// 				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
// 			},
// 		})
// 		thunkAPI.dispatch(clearJobForm())
// 		return response.data
// 	} catch (error) {
// 		if (error.response.status === 401) {
// 			thunkAPI.dispatch(logoutUser())
// 			return thunkAPI.rejectWithValue('Unauthorized! Logging out...')
// 		}
// 	}
// }