import {
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Heading,
	InputGroup,
	InputRightElement,
	Input,
	Link,
	Stack,
	Image,
	useToast,
	Icon,
} from "@chakra-ui/react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { InfoIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useLoginMutation } from "../features/auth/authApiSlice";

import Hero from "../assets/hero.png";

import { z, ZodError } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
	email: z.string().email({
		message: "Невалиден имейл адрес",
	}),
	password: z
		.string()
		.min(8, {
			message: "Паролата трябва да е поне 8 символа",
		})
		// .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
		// 	message:
		// 		"Паролата трябва да съдържа поне една малка буква, една главна буква и една цифра",
		// })
		.max(50, {
			message: "Паролата трябва да е най-много 50 символа",
		}),
});

type SignInFormInputs = z.infer<typeof schema>;

export default function SignInPage() {
	const navigate = useNavigate();
	const toast = useToast();

	const [showPassword, setShowPassword] = useState(false);

	const [login, { isLoading }] = useLoginMutation();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormInputs>({
		resolver: zodResolver(schema),
	});

	const onSubmit = handleSubmit(async (data) => {
		try {
			await login(data).unwrap();
			toast({
				title: "Успешен вход",
				description: "Вие влязохте успешно в акаунта си.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			navigate("/");
		} catch (err) {
			if (err instanceof ZodError) {
				toast({
					title: "Грешка при вход",
					description: err.issues[0].message,
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			} else {
				toast({
					title: "Грешка при вход",
					description: "Възникна грешка при вход",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			}
		}
	});

	return (
		<Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
			<Flex p={8} flex={1} align={"center"} justify={"center"}>
				<Stack spacing={4} w={"full"} maxW={"md"}>
					<Heading fontSize={"2xl"}>Влезте в акаунт</Heading>
					<form onSubmit={onSubmit}>
						<FormControl
							id="email"
							isInvalid={Boolean(errors.email)}
						>
							<FormLabel>Имейл адрес</FormLabel>
							<Input
								id="email"
								type="email"
								{...register("email", {
									required: "Имейлът е задължителен",
								})}
							/>
							<FormErrorMessage>
								<Icon as={InfoIcon} color={"red.500"} />
								{errors.email && errors.email.message}
							</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={Boolean(errors.password)}>
							<FormLabel>Парола</FormLabel>
							<InputGroup>
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									{...register("password", {
										required: "Паролата е задължителна",
									})}
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
							<FormErrorMessage>
								<Icon as={InfoIcon} color="red.500" />
								{errors.password?.message as string}
							</FormErrorMessage>
						</FormControl>
						<Stack spacing={6}>
							<Stack
								direction={{ base: "column", sm: "row" }}
								align={"start"}
								justify={"space-between"}
							>
								<Checkbox>Запомни ме</Checkbox>
								<Link color={"blue.500"}>
									Забравена парола?
								</Link>
							</Stack>
							<Button
								type="submit"
								colorScheme="blue"
								size="lg"
								fontSize="md"
								isLoading={isLoading}
								isDisabled={isSubmitting}
							>
								Влез
							</Button>
							<Link
								color={"blue.500"}
								onClick={() => navigate("/sign-up")}
							>
								Нямате акаунт? Регистрирайте се
							</Link>
						</Stack>
					</form>
				</Stack>
			</Flex>
			<Flex flex={1}>
				<Image alt={"Login Image"} objectFit={"cover"} src={Hero} />
			</Flex>
		</Stack>
	);
}
