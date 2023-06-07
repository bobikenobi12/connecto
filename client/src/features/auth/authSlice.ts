import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApiSlice";

export interface AuthState {
	token: string | null;
	email: String;
	name: String;
	isVolunteer: Boolean;
}

const initialState: AuthState = {
	token: localStorage.getItem("token") || null,
	email: "",
	name: "",
	isVolunteer: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
			localStorage.setItem("token", action.payload);
		},
		logOut: (state) => {
			state.token = null;
			localStorage.removeItem("token");
			localStorage.removeItem("refreshToken");
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApi.endpoints.register.matchFulfilled,
			(state, action) => {
				const { token, refreshToken } = action.payload;
				state.token = token;
				localStorage.setItem("token", token);
				localStorage.setItem("refreshToken", refreshToken);
			}
		);
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, action) => {
				const { token, refreshToken } = action.payload;
				state.token = token;
				localStorage.setItem("token", token);
				localStorage.setItem("refreshToken", refreshToken);
			}
		);
	},
});

export const { setToken, logOut } = authSlice.actions;

export const selectToken = (state: any) => state.auth.token;

export default authSlice.reducer;
