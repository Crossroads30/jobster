import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllJobsThunk, showStatsThunk } from './allJobsThunk'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'

const initialFilterState = {
	search: '',
	searchStatus: 'all',
	searchType: 'all',
	sort: 'latest',
	sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
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

export const getAllJobs = createAsyncThunk('allJobs/getAllJobs',getAllJobsThunk)

export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunk)

const allJobsSlice = createSlice({
	name: 'allJobs',
	initialState,
	reducers: {
		showLoading: state => {
			state.isLoading = true
		},
		hideLoading: state => {
			state.isLoading = false
		},
		handelChange: (state, {payload: {name,value}})=> {
			// state.page = 1 later
			state[name] = value
		},
		clearValues: state => {
			return {
				...state,
				...initialFilterState,
			}
		}
	},
	extraReducers: builder => {
		builder
			// create job-----------
			.addCase(getAllJobs.pending, state => {
				state.isLoading = true
			})
			.addCase(getAllJobs.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.jobs = payload.jobs
				state.numOfPages = payload.numOfPages
				state.totalJobs = payload.totalJobs
			})
			.addCase(getAllJobs.rejected, (state, { payload }) => {
				state.isLoading = false
				toast.error(payload)
			})
			// show stats------------
			.addCase(showStats.pending, state => {
				state.isLoading = true
			})
			.addCase(showStats.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.stats = payload.defaultStats
				state.monthlyApplications = payload.monthlyApplications
			})
			.addCase(showStats.rejected, (state, { payload }) => {
				state.isLoading = false
				toast.error(payload)
			})
	},
})

export const { showLoading, hideLoading, handelChange, clearValues } =
	allJobsSlice.actions
export default allJobsSlice.reducer
