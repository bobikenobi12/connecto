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
		refreshToken: builder.mutation<{ accessToken: string }, void>({
			query: () => ({
				url: `/refreshAccessToken`,
				method: "POST",
				body: {
					refreshToken: localStorage.getItem("refreshToken"),
				},
			}),
		}),
		protected: builder.query<any, void>({
			query: () => ({
				url: `/protected`,
				responseHandler: (res: any) => res.text(),
			}),
		}),
	}),
});

export const { useRegisterMutation, useLoginMutation, useProtectedQuery } =
	authApi;
