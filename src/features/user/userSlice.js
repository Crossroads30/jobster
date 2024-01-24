import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import {
	addUserToLocalStorage,
	removeUserFromLocalStorage,
	getUserFromLocalStorage,
} from '../../utils/localStorage'

const initialState = {
	isLoading: false,
	user: getUserFromLocalStorage(),
}

export const registerUser = createAsyncThunk(
	'user/registerUser', // first: name of slice/ second: name of action
	async (user, thunkAPI) => {
		// console.log(`Register User: ${JSON.stringify(user)}`)
		try {
			const response = await customFetch.post('/auth/register', user) // await!!!
			// console.log(response)
			return response.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)
export const loginUser = createAsyncThunk(
	'user/loginUser', // first: name of slice/ second: name of action
	async (user, thunkAPI) => {
		try {
			const response = await customFetch.post('/auth/login', user) // await!!!
			// console.log(response)
			return response.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	extraReducers: builder => {
		builder
			// registerUser
			.addCase(registerUser.pending, state => {
				state.isLoading = true
			})
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				const { user } = payload
				state.isLoading = false
				state.user = user
        addUserToLocalStorage(user)
				toast.success(`hello there ${user.name}`)
			})
			.addCase(registerUser.rejected, (state, { payload }) => {
				state.isLoading = false
				toast.error(payload)
			})
			// loginUser
			.addCase(loginUser.pending, state => {
				state.isLoading = true
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				const { user } = payload
				state.isLoading = false
				state.user = user
        addUserToLocalStorage(user)
				toast.success(`welcome back, ${user.name}`)
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				state.isLoading = false
				toast.error(payload)
			})
	},
})

export default userSlice.reducer
