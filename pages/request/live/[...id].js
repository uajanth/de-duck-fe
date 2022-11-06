import Head from "next/head";
import { useState, useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { Box, Button } from "@chakra-ui/react";
import Navbar from "../../../src/components/Navbar";
import AuthWrapper from "../../../src/containers/AuthWrapper";
import LiveContainer from "../../../src/containers/LiveContainer";

export default function RequestLive() {
	const [isLoggedIn, setIsLoggedIn] = useState(null);

	const [yourID, setYourID] = useState("");
	const [stream, setStream] = useState();
	const [users, setUsers] = useState({});
	const [receivingCall, setReceivingCall] = useState(false);
	const [caller, setCaller] = useState("");
	const [callerSignal, setCallerSignal] = useState();
	const [incomingVisibility, setIncomingVisibility] = useState(true);

	const userVideoRef = useCallback((node) => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				setStream(stream);
				node.srcObject = stream;
			});
	}, []);

	const guestVideo = useRef();

	const socket = useRef();

	useEffect(() => {
		const userObject = JSON.parse(
			localStorage.getItem(process.env.NEXT_PUBLIC_AUTH_KEY)
		);

		const userIsAuthenticated = userObject?.user?.role === "authenticated";

		if (userIsAuthenticated) {
			setIsLoggedIn(true);
			socket.current = io.connect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/`);

			socket.current.on("yourID", (id) => {
				setYourID(id);
			});
			socket.current.on("allUsers", (users) => {
				setUsers(users);
			});

			socket.current.on("session", (data) => {
				setReceivingCall(true);
				setCaller(data?.from);
				setCallerSignal(data?.signal);
			});
		}
	}, []);

	function callPeer(id) {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream,
		});

		peer.on("signal", (data) => {
			socket.current.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: yourID,
			});
		});

		peer.on("stream", (stream) => {
			if (guestVideo.current) {
				guestVideo.current.srcObject = stream;
			}
		});

		socket.current.on("callAccepted", (signal) => {
			peer.signal(signal);
		});
	}

	function acceptCall() {
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream,
		});

		peer.on("signal", (data) => {
			socket.current.emit("acceptCall", { signal: data, to: caller });
		});

		peer.on("stream", (stream) => {
			guestVideo.current.srcObject = stream;
		});

		peer.signal(callerSignal);
		setIncomingVisibility(false);
	}

	const UserVideo = (
		<video
			playsInline
			muted
			ref={userVideoRef}
			autoPlay
			style={{ height: "100%", width: "100%" }}
		/>
	);

	const GuestVideo = (
		<video
			playsInline
			muted
			ref={guestVideo}
			autoPlay
			style={{ height: "100%", width: "100%" }}
		/>
	);

	// incoming call styling
	let incomingCall;
	if (receivingCall) {
		incomingCall = (
			<Button
				onClick={acceptCall}
				colorScheme="green"
				display={incomingVisibility ? "" : "none"}
			>
				Click to join session
			</Button>
		);
	}

	return (
		<Box width="100vw">
			<Head>
				<title>de-duck</title>
				<meta name="description" content="quack the code" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Navbar isLoggedIn={isLoggedIn} />

			<AuthWrapper isLoggedIn={isLoggedIn}>
				<LiveContainer
					isLoggedIn={isLoggedIn}
					userVideo={UserVideo}
					guestVideo={GuestVideo}
					users={users}
					callPeer={(id) => callPeer(id)}
					incomingCall={incomingCall}
					yourID={yourID}
					incomingVisibility={incomingVisibility}
				/>
			</AuthWrapper>
		</Box>
	);
}

// SSR to verify the request exists, and then to make sure entering user is max 2
// With 1 spot reserved for the author
