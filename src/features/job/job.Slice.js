import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk'

const initialState = {
	isLoading: false,
	isEditing: false,
	position: '',
	company: '',
	jobLocation: '',
	jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
	jobType: 'full-time',
	statusOptions: ['interview', 'declined', 'pending'],
	status: 'pending',
	editJobId: '',
}

export const createJob = createAsyncThunk(
	'job/createJob',
	async (job, thunkAPI) => {
		return createJobThunk('/jobs', job, thunkAPI)
	}
)

export const deleteJob = createAsyncThunk(
	'job/deleteJob',
	async (jobId, thunkAPI) => {
		return deleteJobThunk(`/jobs/${jobId}`, thunkAPI)
	}
)

export const editJob = createAsyncThunk(
	'job/editJob',
	async ({jobId, job}, thunkAPI) => {
		return editJobThunk(`/jobs/${jobId}`, job, thunkAPI)
	}
)

const jobSlice = createSlice({
	name: 'job',
	initialState,
	reducers: {
		handleChange: (state, { payload: { name, value } }) => {
			state[name] = value
		},
		clearJobForm: () => {
			return {
				...initialState,
				// we get location from local storage
				jobLocation: getUserFromLocalStorage()?.location || '',
			}
		},
		setEditLob: (state, { payload }) => {
			return {
				...state,
				isEditing: true,
				...payload,
			}
		},
	},
	extraReducers: builder => {
		builder
			// create job-----------
			.addCase(createJob.pending, state => {
				state.isLoading = true
			})
			.addCase(createJob.fulfilled, (state, action) => {
				state.isLoading = false
				toast.success('Job created!')
			})
			.addCase(createJob.rejected, (state, { payload }) => {
				state.isLoading = false
				toast.error(payload)
			})
			// delete job-----------
			.addCase(deleteJob.fulfilled, (state, { payload }) => {
				toast.success(payload)
			})
			.addCase(deleteJob.rejected, (state, { payload }) => {
				toast.error(payload)
			})
			// edit job------------
			.addCase(editJob.pending, state => {
				state.isLoading = true
			})
			.addCase(editJob.fulfilled, (state, action) => {
				state.isLoading = false
				toast.success('Job modified...')
			})
			.addCase(editJob.rejected, (state, { payload }) => {
				state.isLoading = false
				toast.error(payload)
			})
	},
})

export const { handleChange, clearJobForm, setEditLob } = jobSlice.actions
export default jobSlice.reducer
