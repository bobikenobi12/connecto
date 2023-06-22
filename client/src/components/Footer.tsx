import {
	Box,
	Button,
	Container,
	Link,
	Stack,
	Text,
	useColorModeValue,
	VisuallyHidden,
	Image,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { ReactNode } from "react";

import { Link as RouterLink } from "react-router-dom";

const SocialButton = ({
	children,
	label,
	href,
}: {
	children: ReactNode;
	label: string;
	href: string;
}) => {
	return (
		<Button
			bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
			rounded={"full"}
			w={8}
			h={8}
			cursor={"pointer"}
			display={"inline-flex"}
			alignItems={"center"}
			justifyContent={"center"}
			transition={"background 0.3s ease"}
			_hover={{
				bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
			}}
		>
			<Link as={RouterLink} to={href} isExternal>
				<VisuallyHidden>{label}</VisuallyHidden>
				{children}
			</Link>
		</Button>
	);
};

export default function Footer() {
	return (
		<Box
			bg={useColorModeValue("gray.50", "gray.900")}
			color={useColorModeValue("gray.700", "gray.200")}
		>
			<Container
				as={Stack}
				maxW={"6xl"}
				py={4}
				spacing={4}
				justify={"center"}
				align={"center"}
			>
				<Stack direction={"row"} spacing={6} alignItems={"center"}>
					<Link as={RouterLink} to={"/"}>
						<Image
							src={"/logo.png"}
							alt={"Connectify"}
							width={"40px"}
							height={"40px"}
						/>
					</Link>
					<Text fontSize={"lg"} fontWeight={"bold"}>
						Connectify
					</Text>
				</Stack>

				<Stack direction={"row"} spacing={6}>
					<Link as={RouterLink} to={"/"}>
						Начална страница
					</Link>
					<Link as={RouterLink} to={"/about"}>
						За нас
					</Link>
					<Link as={RouterLink} to={"/privacy-policy"} isExternal>
						Политика на поверителност
					</Link>
					<Link
						as={RouterLink}
						to={"/terms-and-conditions"}
						isExternal
					>
						Условия за ползване
					</Link>
				</Stack>
			</Container>

			<Box
				borderTopWidth={1}
				borderStyle={"solid"}
				borderColor={useColorModeValue("gray.200", "gray.700")}
			>
				<Container
					as={Stack}
					maxW={"6xl"}
					py={4}
					direction={{ base: "column", md: "row" }}
					spacing={4}
					justify={{ base: "center", md: "space-between" }}
					align={{ base: "center", md: "center" }}
				>
					<Text>© 2023 Pupe6 Inc. Всички права запазени</Text>
					<Stack direction={"row"} spacing={6}>
						<SocialButton
							label={"Facebook"}
							href={
								"https://www.facebook.com/profile.php?id=100093563732667"
							}
						>
							<FaFacebook />
						</SocialButton>
						<SocialButton
							label={"Twitter"}
							href={"https://twitter.com/ConnectifySupp"}
						>
							<FaTwitter />
						</SocialButton>
						<SocialButton
							label={"Instagram"}
							href={
								"https://www.instagram.com/connectify_campaign/"
							}
						>
							<FaInstagram />
						</SocialButton>
					</Stack>
				</Container>
			</Box>
		</Box>
	);
}
