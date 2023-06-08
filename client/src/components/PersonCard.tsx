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
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Textarea,
	HStack,
} from "@chakra-ui/react";

import { type Person } from "../features/people/peopleApiSlice";

export default function PersonCard({ person }: { person: Person }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box
			w={"320px"}
			bg={useColorModeValue("white", "gray.900")}
			boxShadow={"2xl"}
			rounded={"lg"}
			p={6}
			textAlign={"center"}
		>
			<Avatar size={"xl"} name={person.name} mb={4} bg={"blue.500"} />
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
				onClick={onOpen}
			>
				Виж повече ...
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						{person.name}-{person.age} години
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<HStack spacing={10}>
							<VStack>
								<Text>Град: {person.location}</Text>
								<Text>
									Учи ли: {person.studying ? "Да" : "Не"}
								</Text>
								<Text>Интереси:</Text>
								{person.interests.map((interest, idx) => (
									<Text key={idx}>#{interest}</Text>
								))}
								<Text>Описание:</Text>
								<Textarea
									isReadOnly
									value={person.description}
								/>
							</VStack>
							<VStack>
								<Avatar
									size={"xl"}
									name={person.name}
									mb={4}
									bg={"blue.500"}
								/>
								<Text>Езици:</Text>
								{person.languages.map((language, idx) => (
									<Text key={idx}>
										{language.language} ({language.level})
									</Text>
								))}
							</VStack>
						</HStack>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Затвори
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
}
