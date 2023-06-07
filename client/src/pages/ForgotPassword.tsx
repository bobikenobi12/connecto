import {
	Button,
	FormControl,
	Flex,
	Heading,
	Input,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

export default function ForgotPasswordForm(): JSX.Element {
	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack
				spacing={4}
				w={"full"}
				maxW={"md"}
				bg={useColorModeValue("white", "gray.700")}
				rounded={"xl"}
				boxShadow={"lg"}
				p={6}
				my={12}
			>
				<Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
					Забравена парола?
				</Heading>
				<Text
					fontSize={{ base: "sm", sm: "md" }}
					color={useColorModeValue("gray.800", "gray.400")}
				>
					Ще получите имейл с инструкции как да смените паролата си.
				</Text>
				<FormControl id="email">
					<Input
						placeholder="johndoe@example.com"
						_placeholder={{ color: "gray.500" }}
						type="email"
					/>
				</FormControl>
				<Stack spacing={6}>
					<Button
						bg={"blue.400"}
						color={"white"}
						_hover={{
							bg: "blue.500",
						}}
					>
						Заявка за нова парола
					</Button>
				</Stack>
			</Stack>
		</Flex>
	);
}
