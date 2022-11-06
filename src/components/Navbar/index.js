import { useState, useEffect } from "react";
import { Button, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Banner from "../Banner";
import Image from "next/image";
import logo from "../../../public/assets/quackquack.svg";
import { signOut } from "../../utils/supabase";

export default function Navbar() {
	const [isLoggedIn, setIsLoggedIn] = useState(null);

	const router = useRouter();
	const isOnHomePage = router.route === "/";
	const isInSession = router.route.includes("/request/live/");

	async function signOutUser() {
		await signOut();
		router.reload();
		return;
	}

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
		<>
			{isOnHomePage && (
				<Banner content="👀 Looking to get paid for helping with debugging? 💰">
					<Button
						size="xs"
						variant="outline"
						onClick={() => {
							router.push("/dashboard");
						}}
					>
						Get Started
					</Button>
				</Banner>
			)}
			<nav>
				<UnorderedList
					style={{
						listStyleType: "none",
						margin: 0,
						padding: "1rem 2rem",
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<ListItem
						style={{ cursor: "pointer", display: "flex", gap: "0.5rem" }}
						onClick={() => {
							router.push("/");
						}}
					>
						<Image src={logo} alt="Quack" width={25} />
						<Heading size="lg">de-duck</Heading>
					</ListItem>
					{isOnHomePage && isLoggedIn !== null && (
						<Button
							colorScheme="orange"
							size="sm"
							rightIcon={<ArrowForwardIcon />}
							onClick={() => {
								router.push("/dashboard");
							}}
						>
							Dashboard
						</Button>
					)}
					{isOnHomePage && isLoggedIn == null && (
						<Button
							colorScheme="orange"
							size="sm"
							rightIcon={<ArrowForwardIcon />}
							onClick={() => {
								router.push("/dashboard");
							}}
						>
							Sign In
						</Button>
					)}
					{!isInSession && isLoggedIn !== null && (
						<Button
							colorScheme="orange"
							size="sm"
							onClick={() => {
								signOutUser();
							}}
						>
							Sign Out
						</Button>
					)}

					{isInSession && isLoggedIn !== null && (
						<Button
							colorScheme="orange"
							variant="outline"
							size="sm"
							onClick={() => {
								router.replace("/dashboard");
							}}
						>
							Leave Session
						</Button>
					)}
				</UnorderedList>
			</nav>
		</>
	);
}
