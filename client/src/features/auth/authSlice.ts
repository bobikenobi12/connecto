import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApiSlice";

export interface AuthState {
	token: string | null;
	email: string;
	name: string;
	isVolunteer: Boolean;
}

const initialState: AuthState = {
	token: localStorage.getItem("token") || null,
	email: localStorage.getItem("email") || "",
	name: localStorage.getItem("name") || "",
	isVolunteer: localStorage.getItem("isVolunteer") === "true" || false,
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
				const { token, refreshToken, user } = action.payload;
				state.email = user.email;
				state.name = user.name;
				state.isVolunteer = user.isVolunteer;
				localStorage.setItem("email", user.email);
				localStorage.setItem("name", user.name);
				localStorage.setItem(
					"isVolunteer",
					user.isVolunteer.toString()
				);
				state.token = token;
				localStorage.setItem("token", token);
				localStorage.setItem("refreshToken", refreshToken);
			}
		);
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, action) => {
				const { token, refreshToken, user } = action.payload;
				state.email = user.email;
				state.name = user.name;
				state.isVolunteer = user.isVolunteer;
				localStorage.setItem("email", user.email);
				localStorage.setItem("name", user.name);
				localStorage.setItem(
					"isVolunteer",
					user.isVolunteer.toString()
				);
				state.token = token;
				localStorage.setItem("token", token);
				localStorage.setItem("refreshToken", refreshToken);
			}
		);
		builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
			state.token = null;
			localStorage.removeItem("token");
			localStorage.removeItem("refreshToken");
		});
	},
});

export const { setToken, logOut } = authSlice.actions;

export const selectToken = (state: any) => state.auth.token;
export const selectEmail = (state: any) => state.auth.email;
export const selectIsVolunteer = (state: any) => state.auth.isVolunteer;

export default authSlice.reducer;
