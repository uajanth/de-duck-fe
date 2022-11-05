import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import RequestCard from "../../components/RequestCard";
import RequestModal from "../../components/RequestModal";

export default function RequestsContainer({ requests }) {
	const tagColors = {
		javascript: "yellow",
		react: "cyan",
		python: "messenger",
		java: "orange",
	};

	const router = useRouter();

	return (
		<>
			<Flex direction="column">
				<Flex align="center" gap={2} marginBottom={2}>
					<Heading
						bgGradient="linear(to-r, red.300, orange.300)"
						bgClip="text"
						fontSize="6xl"
						fontWeight="extrabold"
					>
						Requests
					</Heading>
					<RequestModal />
				</Flex>

				<Flex direction="column" gap={4}>
					{requests.map((request) => {
						return (
							<RequestCard
								key={request.id}
								subject={request.subject}
								color={tagColors[request.technology.toLowerCase()]}
								author={request.author}
								offer={request.offer}
								technology={request.technology}
								description={request.description}
								onJoin={() => router.push(`/request/live/${request.id}`)}
							/>
						);
					})}
				</Flex>
			</Flex>
		</>
	);
}
