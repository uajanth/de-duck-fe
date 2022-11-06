import { Flex, Link, Text } from "@chakra-ui/react";
import { SiDevpost } from "react-icons/si";

export default function Footer() {
	return (
		<Flex
			p={5}
			marginTop={10}
			color="whiteAlpha.300"
			direction="column"
			justifyContent="center"
			alignItems="center"
			gap={2}
		>
			<Text fontSize="xs" align="center">
				Submission for New Hacks 2022
			</Text>
			<a
				href="https://devpost.com/software/de-duck"
				target="_blank"
				rel="noreferrer"
			>
				<SiDevpost fontSize={40} cursor="pointer" />
			</a>
		</Flex>
	);
}
