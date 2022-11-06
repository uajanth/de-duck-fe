import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../src/components/Navbar";
import { useRouter } from "next/router";
import {
	Box,
	Button,
	Flex,
	Heading,
	Text,
	Grid,
	GridItem,
} from "@chakra-ui/react";
import FeatureCard from "../src/components/FeatureCard";

export default function Home() {
	const [isLoggedIn, setIsLoggedIn] = useState(null);

	const router = useRouter();

	const features = [
		{
			emoji: "⚡",
			title: "Feature 1",
			desc: "This is a sample description for feature 1",
		},
		{
			emoji: "💡",
			title: "Feature 2",
			desc: "This is a sample description for feature 2",
		},
		{
			emoji: "🔧",
			title: "Feature 3",
			desc: "This is a sample description for feature 3",
		},
		{
			emoji: "📦",
			title: "Feature 4",
			desc: "This is a sample description for feature 4",
		},
		{
			emoji: "🔩",
			title: "Feature 5",
			desc: "This is a sample description for feature 5",
		},
		{
			emoji: "🔑",
			title: "Feature 6",
			desc: "This is a sample description for feature 6",
		},
	];

	useEffect(() => {
		const userObject = JSON.parse(
			localStorage.getItem(process.env.NEXT_PUBLIC_AUTH_KEY)
		)?.user;

		const userIsAuthenticated = userObject?.user?.role === "authenticated";

		if (userIsAuthenticated) {
			setIsLoggedIn(true);
		}
	}, []);

	return (
		<Box width="100vw">
			<Head>
				<title>de-duck</title>
				<meta name="description" content="quack the code" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Navbar isLoggedIn={isLoggedIn} />
			<Box
				width={["90%", "", "75%", "70%"]}
				margin="0 auto"
				display="flex"
				flexDirection="column"
				gap={20}
			>
				<Flex
					direction="column"
					gap={2}
					justifyContent="center"
					alignItems="center"
				>
					<Heading
						textAlign="center"
						bgGradient="linear(to-r, red.300, orange.300)"
						bgClip="text"
						fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
						fontWeight="extrabold"
					>
						For the times stack overflow has no answers
					</Heading>
					<Text
						textAlign="center"
						fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
						color="gray.300"
					>
						Get live help with debugging until it&apos;s quacked
					</Text>
					<Button
						width="fit-content"
						onClick={() => {
							router.push("/dashboard");
						}}
					>
						Get Started
					</Button>
				</Flex>

				<Grid templateColumns="repeat(3, 1fr)" gap={6} width="100%">
					{features.map((feature, index) => {
						return (
							<GridItem
								key={index}
								w="100%"
								p={4}
								bg="whiteAlpha.100"
								borderRadius="md"
							>
								<FeatureCard
									emoji={feature.emoji}
									title={feature.title}
									desc={feature.desc}
								/>
							</GridItem>
						);
					})}
				</Grid>
			</Box>
		</Box>
	);
}
