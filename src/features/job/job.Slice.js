import { createSlice } from '@reduxjs/toolkit'

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

const jobSlice = createSlice({
	name: 'job',
	initialState,
	reducers: {
		clearJobForm: () => {
			console.log('clear forms')
		},
	},
	extraReducers: {},
})

export const { clearJobForm } = jobSlice.actions
export default jobSlice.reducer
