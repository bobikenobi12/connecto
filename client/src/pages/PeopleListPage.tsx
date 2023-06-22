import { Flex, useColorModeValue, Skeleton } from "@chakra-ui/react";

import PersonCard from "../components/PersonCard";

import { useGetPeopleQuery } from "../features/people/peopleApiSlice";

function PeopleListPageSkeleton() {
	return (
		<Flex
			minH={"100vh"}
			flexWrap="wrap"
			justifyContent="center"
			alignItems="center"
			gap={6}
			bg={useColorModeValue("gray.100", "gray.800")}
		>
			{Array.from(Array(5)).map((_, idx) => (
				<Skeleton key={idx} width="300px" height="400px" />
			))}
		</Flex>
	);
}

export default function PeopleListPage() {
	const { data: people, isLoading } = useGetPeopleQuery();

	if (isLoading) return <PeopleListPageSkeleton />;

	return (
		<Flex
			minH={"100vh"}
			flexWrap="wrap"
			justifyContent="center"
			alignItems="center"
			gap={6}
			bg={useColorModeValue("gray.100", "gray.800")}
		>
			{people?.map((person, idx) => (
				<PersonCard key={idx} person={person} />
			))}
		</Flex>
	);
}
