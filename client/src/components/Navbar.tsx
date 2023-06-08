import {
	Box,
	Flex,
	HStack,
	Link,
	IconButton,
	Button,
	useDisclosure,
	useColorModeValue,
	Stack,
	useToast,
} from "@chakra-ui/react";

import { useNavigate, Link as RouterLink } from "react-router-dom";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { selectToken } from "../features/auth/authSlice";
import { useAppSelector } from "../app/hooks";

import { useLogoutMutation } from "../features/auth/authApiSlice";

import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const navigate = useNavigate();
	const toast = useToast();

	const token = useAppSelector(selectToken);

	const [logout] = useLogoutMutation();

	return (
		<>
			<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
				<Flex
					h={16}
					alignItems={"center"}
					justifyContent={"space-between"}
				>
					<IconButton
						size={"md"}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={"Open Menu"}
						display={{ md: "none" }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={"center"}>
						<Box>Logo</Box>
						<HStack
							as={"nav"}
							spacing={4}
							display={{ base: "none", md: "flex" }}
						>
							<Link
								px={2}
								py={1}
								rounded={"md"}
								_hover={{
									textDecoration: "none",
									bg: useColorModeValue(
										"gray.200",
										"gray.700"
									),
								}}
								as={RouterLink}
								to={"/"}
							>
								Начало
							</Link>
							<Link
								px={2}
								py={1}
								rounded={"md"}
								_hover={{
									textDecoration: "none",
									bg: useColorModeValue(
										"gray.200",
										"gray.700"
									),
								}}
								as={RouterLink}
								to={"/people"}
							>
								Хора
							</Link>
							<Link
								px={2}
								py={1}
								rounded={"md"}
								_hover={{
									textDecoration: "none",
									bg: useColorModeValue(
										"gray.200",
										"gray.700"
									),
								}}
								as={RouterLink}
								to={"/events"}
							>
								Събития
							</Link>
						</HStack>
					</HStack>
					<Flex alignItems={"center"}>
						{!token ? (
							<Stack
								flex={{ base: 1, md: 0 }}
								justify={"flex-end"}
								direction={"row"}
								spacing={6}
							>
								<ThemeToggle />
								<Button
									fontSize={"sm"}
									fontWeight={400}
									variant={"link"}
									onClick={() => navigate("/sign-in")}
									cursor={"pointer"}
								>
									Вход
								</Button>
								<Button
									display={{
										base: "none",
										md: "inline-flex",
									}}
									cursor={"pointer"}
									onClick={() => navigate("/sign-up")}
									fontSize={"sm"}
									fontWeight={600}
									color={"white"}
									bg={"blue.400"}
									_hover={{
										bg: "blue.300",
									}}
								>
									Регистрация
								</Button>
							</Stack>
						) : (
							<Stack
								flex={{ base: 1, md: 0 }}
								justify={"flex-end"}
								direction={"row"}
								spacing={6}
							>
								<ThemeToggle />
								<Button
									fontSize={"sm"}
									fontWeight={400}
									colorScheme="red"
									variant={"outline"}
									onClick={async () => {
										try {
											await logout().unwrap();
											toast({
												title: "Успешно излязохте от профила си!",
												status: "success",
												duration: 9000,
												isClosable: true,
											});
											navigate("/");
										} catch (err) {
											toast({
												title: "Възникна грешка при излизане от профила ви!",
												description:
													"Моля, опитайте отново!",
												status: "error",
												duration: 9000,
												isClosable: true,
											});
										}
									}}
								>
									Изход
								</Button>
							</Stack>
						)}
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							<Link
								px={2}
								py={1}
								rounded={"md"}
								_hover={{
									textDecoration: "none",
									bg: useColorModeValue(
										"gray.200",
										"gray.700"
									),
								}}
								as={RouterLink}
								to={"/"}
							>
								Начало
							</Link>
							<Link
								px={2}
								py={1}
								rounded={"md"}
								_hover={{
									textDecoration: "none",
									bg: useColorModeValue(
										"gray.200",
										"gray.700"
									),
								}}
								as={RouterLink}
								to={"/people"}
							>
								Хора
							</Link>
							<Link
								px={2}
								py={1}
								rounded={"md"}
								_hover={{
									textDecoration: "none",
									bg: useColorModeValue(
										"gray.200",
										"gray.700"
									),
								}}
								as={RouterLink}
								to={"/events"}
							>
								Събития
							</Link>
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
}
