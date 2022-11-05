import { Box, Text } from "@chakra-ui/react";

export default function Banner({ content, children }) {
	return (
		<Box
			w="100%"
			bgGradient="linear(to-l, blue.300, red.300, purple.300)"
			display="flex"
			alignItems="center"
			justifyContent="center"
			gap={5}
			padding="0.5rem"
		>
			<Text align="center" fontSize="sm" fontWeight={700}>
				{content}
			</Text>
			{children}
		</Box>
	);
}
