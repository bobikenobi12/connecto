import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from "@chakra-ui/react";

import { Link as RouterLink } from "react-router-dom";

import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function SignupCard() {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack
				spacing={8}
				mx={"auto"}
				py={12}
				px={6}
				maxW={"lg"}
				w={"full"}
			>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Регистрирай се
					</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						за да започнеш да използваш приложението
					</Text>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Stack spacing={4}>
						<FormControl id="firstName" isRequired>
							<FormLabel>Име</FormLabel>
							<Input type="text" />
						</FormControl>
						<FormControl id="email" isRequired>
							<FormLabel>Имейл адрес</FormLabel>
							<Input type="email" />
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel>Парола</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() =>
											setShowPassword(
												(showPassword) => !showPassword
											)
										}
									>
										{showPassword ? (
											<ViewIcon />
										) : (
											<ViewOffIcon />
										)}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText="Submitting"
								size="lg"
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
							>
								Регистрация
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Имате акаунт?{" "}
								<Link
									color={"blue.400"}
									as={RouterLink}
									to="/sign-in"
								>
									Влезте в него
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
