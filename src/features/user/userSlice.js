import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import {
	addUserToLocalStorage,
	removeUserFromLocalStorage,
	getUserFromLocalStorage,
} from '../../utils/localStorage'
import { loginUserThunk, registerUserThunk, updateUserThunk } from './userThunk'

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
		return registerUserThunk('/auth/register', user, thunkAPI)
	}
)
export const loginUser = createAsyncThunk(
	'user/loginUser', // first param: name of slice/name of action
	async (user, thunkAPI) => {
		// second: async function
return loginUserThunk('auth/login',user, thunkAPI)
	}
)
export const updateUser = createAsyncThunk(
	'user/updateUser', // first param: name of slice/name of action
	async (user, thunkAPI) => {
		// second: async function
		return updateUserThunk('/auth/updateUser',user,thunkAPI)
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
