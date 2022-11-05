import { Flex, Heading, Box, Text } from "@chakra-ui/react";

export default function FeatureCard({ emoji, title, desc }) {
	return (
		<Flex width="100%" direction="column" gap={2}>
			<Box
				// bg="#242424"
				bg="whiteAlpha.200"
				padding="0.8rem 1rem"
				borderRadius="lg"
				width="fit-content"
			>
				<Text fontSize="xl">{emoji}</Text>
			</Box>
			<Heading size="sm">{title}</Heading>
			<Text fontSize="sm" color="#ebebeb99">
				{desc}
			</Text>
		</Flex>
	);
}
