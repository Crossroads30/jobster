import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'

const initialState = {
	isLoading: false,
	user: null,
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
	'user/loginUser',
	async (user, thunkAPI) => {
		// console.log(`Login User: ${JSON.stringify(user)}`)
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	extraReducers: builder => {
		builder
			.addCase(registerUser.pending, state => {
				state.isLoading = true
			})
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				const { user } = payload
				state.isLoading = false
				state.user = user
				toast.success(`hello there ${user.name}`)
			})
			.addCase(registerUser.rejected, (state, { payload }) => {
				state.isLoading = false
				toast.error(payload)
				// console.log(payload)
			})
	},
})

export default userSlice.reducer
