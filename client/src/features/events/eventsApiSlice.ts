import { apiSlice } from "../../app/api/apiSlice";
import { type User } from "../auth/authApiSlice";

export interface Event {
	name: string;
	description: string;
	location: string;
	date: Date;
	volunteers: User[];
}

export interface VolunteerRequest {
	name: string;
	email: string;
}

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getEvents: builder.query<Event[], void>({
			query: () => ({
				url: `/events/all`,
			}),
		}),
		volunteer: builder.mutation<void, VolunteerRequest>({
			query: (body) => ({
				url: `/events/volunteer`,
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useGetEventsQuery, useVolunteerMutation } = authApi;
