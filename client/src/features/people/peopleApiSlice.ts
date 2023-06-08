import { apiSlice } from "../../app/api/apiSlice";

export interface Language {
	language: string;
	level: string;
}

export interface Person {
	name: string;
	age: number;
	isFemale: boolean;
	description: string;
	location: string;
	languages: Language[];
	interests: string[];
	studying: boolean;
	imageURL: string;
}

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPeople: builder.query<Person[], void>({
			query: () => ({
				url: `/kids/all`,
			}),
			keepUnusedDataFor: 180,
		}),
	}),
});

export const { useGetPeopleQuery } = authApi;
