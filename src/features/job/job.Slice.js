import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import { createJobThunk } from './jobThunk'

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

const jobSlice = createSlice({
	name: 'job',
	initialState,
	reducers: {
		handleChange: (state, { payload: { name, value } }) => {
			state[name] = value
		},
		clearJobForm: () => {
			return initialState
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
	},
})

export const { handleChange, clearJobForm } = jobSlice.actions
export default jobSlice.reducer
