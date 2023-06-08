import { apiSlice } from "../../app/api/apiSlice";

export interface RegisterRequest {
	email: string;
	password: string;
	isVolunteer: boolean;
	name: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface Tokens {
	token: string;
	refreshToken: string;
}

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation<Tokens, RegisterRequest>({
			query: (body) => ({
				url: `/auth/register`,
				method: "POST",
				body,
			}),
		}),
		login: builder.mutation<Tokens, LoginRequest>({
			query: (body) => ({
				url: `/auth/login`,
				method: "POST",
				body,
			}),
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: `/auth/logout`,
				method: "POST",
				body: {
					refreshToken: localStorage.getItem("refreshToken"),
				},
			}),
		}),
		refreshToken: builder.mutation<{ accessToken: string }, void>({
			query: () => ({
				url: `/refreshAccessToken`,
				method: "POST",
				body: {
					refreshToken: localStorage.getItem("refreshToken"),
				},
			}),
		}),
	}),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
	authApi;
