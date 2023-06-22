import {
	Box,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	List,
	ListItem,
	ListIcon,
	Flex,
	useToast,
	Button,
	AvatarGroup,
	Avatar,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
	useColorModeValue,
	Skeleton,
} from "@chakra-ui/react";

import { CalendarIcon, InfoIcon, QuestionOutlineIcon } from "@chakra-ui/icons";

import { type Event } from "../features/events/eventsApiSlice";

import {
	useGetEventsQuery,
	useVolunteerMutation,
} from "../features/events/eventsApiSlice";

import { useAppSelector } from "../app/hooks";
import {
	selectEmail,
	selectIsVolunteer,
	selectToken,
} from "../features/auth/authSlice";

import { useNavigate } from "react-router-dom";

function EventsSkeleton() {
	return (
		<Box minH="100vh" bg={useColorModeValue("gray.100", "gray.800")}>
			<Accordion allowToggle>
				{Array.from(Array(5)).map((_, idx) => (
					<AccordionItem key={idx}>
						<h2>
							<AccordionButton>
								<Box as="span" flex="1" textAlign="left">
									<Skeleton height="20px" width="100%" />
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>
							<Flex
								justifyContent="center"
								alignItems="center"
								direction={["column", "row"]}
								gap={6}
							>
								<List spacing={3}>
									<ListItem>
										<ListIcon
											as={CalendarIcon}
											color="green.500"
										/>
										<Skeleton height="20px" width="100%" />
									</ListItem>
									<ListItem>
										<ListIcon
											as={QuestionOutlineIcon}
											color="green.500"
										/>
										<Skeleton height="20px" width="100%" />
									</ListItem>
									<ListItem>
										<ListIcon
											as={InfoIcon}
											color="green.500"
										/>
										<Skeleton height="20px" width="100%" />
									</ListItem>
								</List>
								<AvatarGroup
									size="md"
									max={5}
									gap={4}
									flexDirection={["column", "row"]}
								>
									{Array.from(Array(5)).map((_, idx) => (
										<Avatar key={idx} />
									))}
								</AvatarGroup>
								<Button colorScheme="green" isDisabled>
									Запиши се
								</Button>
							</Flex>
						</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</Box>
	);
}

export default function Events() {
	const token = useAppSelector(selectToken);
	const isVolunteer = useAppSelector(selectIsVolunteer);
	const email = useAppSelector(selectEmail);

	const navigate = useNavigate();
	const toast = useToast();

	const [volunteer, { isLoading: isVolunteering }] = useVolunteerMutation();

	const { data: events, isLoading } = useGetEventsQuery();

	if (isLoading) return <EventsSkeleton />;

	return (
		<Box minH="100vh" bg={useColorModeValue("gray.100", "gray.800")}>
			<Accordion allowToggle>
				{Array.from(events ?? []).map((event: Event, idx) => (
					<AccordionItem key={idx}>
						<h2>
							<AccordionButton>
								<Box as="span" flex="1" textAlign="left">
									{event.name}
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>
							<Flex
								justifyContent="center"
								alignItems="center"
								direction={["column", "row"]}
								gap={6}
							>
								<List spacing={3}>
									<ListItem>
										<ListIcon
											as={CalendarIcon}
											color="green.500"
										/>
										{new Date(
											event.date
										).toLocaleDateString()}
									</ListItem>
									<ListItem>
										<ListIcon
											as={QuestionOutlineIcon}
											color="green.500"
										/>
										{event.location}
									</ListItem>
									<ListItem>
										<ListIcon
											as={InfoIcon}
											color="green.500"
										/>
										{event.description}
									</ListItem>
								</List>
								<AvatarGroup
									size="md"
									max={5}
									gap={4}
									flexDirection={["column", "row"]}
								>
									{event.volunteers.map((volunteer, idx) => (
										<Popover key={idx}>
											<PopoverTrigger>
												<Avatar
													name={volunteer.name}
													cursor={"pointer"}
												/>
											</PopoverTrigger>
											<PopoverContent>
												<PopoverArrow />
												<PopoverCloseButton />
												<PopoverHeader>
													{volunteer.name}
												</PopoverHeader>
												<PopoverBody>
													{volunteer.email}
												</PopoverBody>
											</PopoverContent>
										</Popover>
									))}
								</AvatarGroup>
								{isVolunteer && (
									<Button
										colorScheme="green"
										isLoading={isVolunteering}
										isDisabled={isVolunteering}
										onClick={async () => {
											try {
												await volunteer({
													name: event.name,
													email,
												});
												toast({
													title: "Успешно записване",
													description:
														"Успешно се записахте за събитието",
													status: "success",
													duration: 9000,
													isClosable: true,
												});
											} catch (err) {
												toast({
													title: "Грешка",
													description:
														"Вече сте записани за това събитие",
													status: "error",
													duration: 9000,
													isClosable: true,
												});
											}
										}}
									>
										Запиши се
									</Button>
								)}

								{!token && (
									<Button
										colorScheme="green"
										onClick={() => navigate("/sign-up")}
									>
										Запиши се
									</Button>
								)}
							</Flex>
						</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</Box>
	);
}
