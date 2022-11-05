import { Box, Flex, Heading, Text, Tag, IconButton } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function RequestCard({
	author,
	subject,
	offer,
	description,
	technology,
	color,
	onJoin,
}) {
	return (
		<Box
			borderColor="white.600"
			borderRadius="md"
			borderWidth="2px"
			padding={2}
		>
			<Flex align="center" justify="space-between" gap={2} marginBottom={0}>
				<Flex align="center" gap={2}>
					<Heading size="lg">{subject}</Heading>
					<Text fontSize="md" fontWeight={600} color="green.300">
						{offer === 0 ? "FREE" : `$${offer.toFixed(2)}`}
					</Text>
				</Flex>
				<IconButton size="xs" icon={<ChevronRightIcon />} onClick={onJoin} />
			</Flex>
			<Text
				fontSize="xs"
				color="gray.400"
				marginBottom={2}
			>{`by ${author}`}</Text>
			<Tag colorScheme={color} size="sm">
				{technology}
			</Tag>
			<Text fontSize="sm">{description}</Text>
		</Box>
	);
}
