import {
	Box,
	Heading,
	Text,
	ListItem,
	OrderedList,
	Button,
} from "@chakra-ui/react";

import { Link as RouterLink } from "react-router-dom";

export default function PrivacyPolicy(): JSX.Element {
	return (
		<Box minH={"100vh"} p={6}>
			<Heading as="h1" mb={4}>
				Добре дошли на страницата политика на поверителност за
				използване на нашата платформа Connectify
			</Heading>
			<Text mb={4}>
				Вашата поверителност е от изключителна важност за нас.
				Настоящата политика на поверителност обяснява каква информация
				събираме от вас, как я използваме и защитаваме. Моля, прочетете
				я внимателно.
			</Text>
			<OrderedList mb={4}>
				<ListItem>
					<Text>
						Събиране на информация: Събираме лична информация,
						когато се регистрирате на нашата платформа Connectify
						или когато я предоставите доброволно при използване на
						нашите услуги. Тази информация може да включва вашето
						име, адрес, електронна поща и други съответни данни.
					</Text>
				</ListItem>
				<ListItem>
					<Text>
						Използване на информация: Използваме предоставената
						информация, за да осигурим услугите и функциите на
						Connectify, да ви предоставим връзки със събития и
						организации и да подобрим вашето потребителско
						изживяване. Можем да използваме вашата информация и за
						комуникация с вас, включително за предоставяне на
						актуализации и информация относно платформата.
					</Text>
				</ListItem>
				<ListItem>
					<Text>
						Защита на информацията: Прилагаме подходящи технически и
						организационни мерки за защита на предоставената
						информация от неразрешен достъп, загуба, злоупотреба или
						разкриване.
					</Text>
				</ListItem>
				<ListItem>
					<Text>
						Споделяне на информация: Ние не споделяме личната ви
						информация с трети страни, освен ако това е необходимо
						за предоставянето на услугите, съответствие със
						законовите изисквания или с вашето изрично съгласие.
						Можем да споделяме анонимизирана или обобщена
						информация, която не може да бъде идентифицирана с
						индивидуални потребители, за статистически анализ или
						маркетингови цели.
					</Text>
				</ListItem>
				<ListItem>
					<Text>
						Права на достъп и корекция: Вие имате право да поискате
						достъп до вашата лична информация, която сме събрали, и
						да поискате корекция или изтриване на неточни или
						непълни данни.
					</Text>
				</ListItem>
				<ListItem>
					<Text>
						Промени в политиката на поверителност: Моля, имайте
						предвид, че настоящата политика на поверителност може да
						бъде променена от време на време. Актуалната версия ще
						бъде публикувана на нашия уебсайт.
					</Text>
				</ListItem>
			</OrderedList>

			<Text mb={4}>
				Ако имате въпроси относно нашата политика на поверителност или
				начина, по който обработваме вашата информация, моля, свържете
				се с нас чрез контактната форма или имейл, посочени в нашия
				уебсайт.
			</Text>

			<Text mb={4}>Благодарим ви, че избрахте Connectify!</Text>

			<Button
				colorScheme="blue"
				as={RouterLink}
				to="/"
				mb={4}
				mt={4}
				size="lg"
			>
				Върнете се на началната страница
			</Button>
		</Box>
	);
}
