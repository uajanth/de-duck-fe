import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../../src/components/Navbar";
import AuthWrapper from "../../src/containers/AuthWrapper";
import RequestsContainer from "../../src/containers/RequestsContainer";
import { Box, Container } from "@chakra-ui/react";
import { fetchDB } from "../../src/utils/supabase";

export default function DashboardPage() {
	const [isLoggedIn, setIsLoggedIn] = useState(null);

	const [requests, setRequests] = useState([]);

	const fetchRequests = async () => {
		const requests = await fetchDB("requests");
		setRequests(requests);
	};

	useEffect(() => {
		const userObject = JSON.parse(
			localStorage.getItem(process.env.NEXT_PUBLIC_AUTH_KEY)
		);

		const userIsAuthenticated = userObject?.user?.role === "authenticated";

		if (userIsAuthenticated) {
			setIsLoggedIn(true);
			fetchRequests();
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
			<Container>
				<AuthWrapper isLoggedIn={isLoggedIn}>
					<RequestsContainer requests={requests} />
				</AuthWrapper>
			</Container>
		</Box>
	);
}
