import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllJobsThunk } from './allJobsThunk'
import { toast } from 'react-toastify'

const initialFilterState = {
	search: '',
	searchStatus: 'all',
	searchType: 'all',
	sort: 'latest',
	sortOption: ['latest', 'oldest', 'a-z', 'z-a'],
}
const initialState = {
	isLoading: false,
	jobs: [],
	totalJobs: 0,
	numOfPages: 1,
	page: 1,
	stats: {},
	monthlyApplications: [],
	...initialFilterState,
}

export const getAllJobs = createAsyncThunk(
	'allJobs/getAllJobs',
	async (_, thunkAPI) => {
		let url = `/jobs`
		return getAllJobsThunk(url, _, thunkAPI)
	}
)

const allJobsSlice = createSlice({
	name: 'allJobs',
	initialState,
	extraReducers: builder => {
		builder
			// create job-----------
			.addCase(getAllJobs.pending, state => {
				state.isLoading = true
			})
			.addCase(getAllJobs.fulfilled, (state, {payload}) => {
				state.isLoading = false
				state.jobs = payload.jobs
			})
			.addCase(getAllJobs.rejected, (state, { payload }) => {
				state.isLoading = false
				toast.error(payload)
			})
	},
})

export default allJobsSlice.reducer
