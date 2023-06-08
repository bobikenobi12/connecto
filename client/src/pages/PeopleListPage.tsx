import { Flex } from "@chakra-ui/react";

import PersonCard from "../components/PersonCard";

import { useGetPeopleQuery } from "../features/people/peopleApiSlice";

export default function PeopleListPage() {
	const { data: people, isLoading } = useGetPeopleQuery();

	if (isLoading) return <div>Зареждане...</div>;

	return (
		<Flex
			minH={"100vh"}
			flexWrap="wrap"
			justifyContent="center"
			alignItems="center"
			gap={6}
			overflowY={"scroll"}
		>
			{people?.map((person, idx) => (
				<PersonCard key={idx} person={person} />
			))}
		</Flex>
	);
}
