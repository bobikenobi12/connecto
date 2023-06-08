import {
	Heading,
	Avatar,
	Box,
	Text,
	Stack,
	Button,
	Badge,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";

import { type Person } from "../features/people/peopleApiSlice";

export default function PersonCard({ person }: { person: Person }) {
	return (
		<Box
			w={"320px"}
			bg={useColorModeValue("white", "gray.900")}
			boxShadow={"2xl"}
			rounded={"lg"}
			p={6}
			textAlign={"center"}
		>
			<Avatar
				size={"xl"}
				src={
					"https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
				}
				mb={4}
				pos={"relative"}
				_after={{
					content: '""',
					w: 4,
					h: 4,
					bg: "green.300",
					border: "2px solid white",
					rounded: "full",
					pos: "absolute",
					bottom: 0,
					right: 3,
				}}
			/>
			<Heading fontSize={"2xl"} fontFamily={"body"}>
				{person.name} - {person.age}
			</Heading>
			<Text fontWeight={600} color={"gray.500"} mb={4}>
				{person.location} ({person.studying ? "Учи" : "Не Учи"})
			</Text>
			<VStack align={"start"} mt={4}>
				<Text fontWeight={600}>Езици:</Text>

				{person.languages.map((language, idx) => (
					<Text key={idx}>
						{language.language} ({language.level})
					</Text>
				))}
			</VStack>
			<Stack align={"center"} justify={"center"} direction={"row"} my={3}>
				{person.interests.map((interest, idx) => (
					<Badge
						key={idx}
						px={2}
						py={1}
						bg={useColorModeValue("gray.50", "gray.800")}
						fontWeight={"400"}
					>
						#{interest}
					</Badge>
				))}
			</Stack>
			<Button
				w={"full"}
				flex={1}
				fontSize={"sm"}
				rounded={"full"}
				bg={"blue.400"}
				color={"white"}
				boxShadow={
					"0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
				}
				_hover={{
					bg: "blue.500",
				}}
				_focus={{
					bg: "blue.500",
				}}
			>
				Виж повече ...
			</Button>
		</Box>
	);
}
