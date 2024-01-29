import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import {
	addUserToLocalStorage,
	removeUserFromLocalStorage,
	getUserFromLocalStorage,
} from '../../utils/localStorage'
import { clearStoreThunk, loginUserThunk, registerUserThunk, updateUserThunk } from './userThunk'

const initialState = {
	isLoading: false,
	isSidebarOpen: false,
	user: getUserFromLocalStorage(),
	// isAuthError: false,
}

// first param: name of slice/name of action
// second: async function
export const registerUser = createAsyncThunk('user/registerUser',registerUserThunk )

export const loginUser = createAsyncThunk('user/loginUser', loginUserThunk)

export const updateUser = createAsyncThunk('user/updateUser', updateUserThunk)

export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk)

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		toggleSidebar: state => {
			state.isSidebarOpen = !state.isSidebarOpen
		},
		logoutUser: (state, {payload}) => {
			state.user = null
			state.isSidebarOpen = false
			removeUserFromLocalStorage()
			if (payload) {
				toast.success(payload)
			}
			state.isAuthError = false
		},
		// setAuthError: state => {
		// 	state.isAuthError = true
		// },
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
			// clearStore ------------
			.addCase(clearStore.rejected, () => {
				toast.error('there was an error...')
			})
	},
})

export const { toggleSidebar, logoutUser, setAuthError } = userSlice.actions
export default userSlice.reducer
