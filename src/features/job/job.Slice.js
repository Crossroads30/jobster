import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage' 

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
	extraReducers: builder => {},
})

export const { clearJobForm } = jobSlice.actions
export default jobSlice.reducer