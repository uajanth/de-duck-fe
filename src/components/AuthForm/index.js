import { Box, Button, FormControl } from "@chakra-ui/react";
import { signIn } from "../../utils/supabase";
import { FaDiscord } from "react-icons/fa";

export default function AuthForm({}) {
	async function signInWithDiscord() {
		await signIn();
	}
	return (
		<Box>
			<FormControl display="flex" flexDirection="column" gap={2}>
				<Button
					colorScheme="orange"
					width="100%"
					leftIcon={<FaDiscord size={24} />}
					onClick={signInWithDiscord}
				>
					Authenticate with Discord
				</Button>
			</FormControl>
		</Box>
	);
}
