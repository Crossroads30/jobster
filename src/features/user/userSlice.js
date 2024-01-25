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
	isSidebarOpen: false,
	user: getUserFromLocalStorage(),
}

export const registerUser = createAsyncThunk(
	'user/registerUser', // first param: name of slice/name of action
	async (user, thunkAPI) => {
		// second: async function
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
	'user/loginUser', // first param: name of slice/name of action
	async (user, thunkAPI) => {
		// second: async function
		try {
			const response = await customFetch.post('/auth/login', user) // await!!!
			// console.log(response)
			return response.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)
export const updateUser = createAsyncThunk(
	'user/updateUser', // first param: name of slice/name of action
	async (user, thunkAPI) => {
		// second: async function
		try {
			const response = await customFetch.patch('/auth/updateUser', user, {
				headers: {
					authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
				},
			}) // (await!!!) third: options
			// console.log(response)
			return response.data
		} catch (error) {
			if (error.response.status === 401) {
				thunkAPI.dispatch(logoutUser())
				return thunkAPI.rejectWithValue('Unauthorized! Logging out...')
			}
			// console.log(error.response)
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		toggleSidebar: state => {
			state.isSidebarOpen = !state.isSidebarOpen
		},
		logoutUser: state => {
			state.user = null
			state.isSidebarOpen = false
			toast.success(`logout successful!`)
			removeUserFromLocalStorage()
		},
	},
	extraReducers: builder => {
		builder
			// registerUser-----------
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
			// loginUser-------------
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
			// updateUser--------------
			.addCase(updateUser.pending, state => {
				state.isLoading = true
			})
			.addCase(updateUser.fulfilled, (state, { payload }) => {
				const { user } = payload
				state.isLoading = false
				state.user = user
				addUserToLocalStorage(user)
				toast.success(`user updated!`)
			})
			.addCase(updateUser.rejected, (state, { payload }) => {
				state.isLoading = false
				toast.error(payload)
			})
	},
})

export const { toggleSidebar, logoutUser } = userSlice.actions
export default userSlice.reducer
