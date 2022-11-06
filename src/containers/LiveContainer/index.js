import { Flex, Box, IconButton, Button } from "@chakra-ui/react";
import { useState } from "react";
import {
	BsFillMicFill,
	BsFillMicMuteFill,
	BsFillCameraVideoFill,
	BsFillCameraVideoOffFill,
} from "react-icons/bs";
import { MdScreenShare, MdStopScreenShare } from "react-icons/md";

export default function LiveContainer({
	userVideo,
	guestVideo,
	yourID,
	users,
	callPeer,
	incomingCall,
}) {
	const [videoStatus, setVideoStatus] = useState(true);
	const [micStatus, setMicStatus] = useState(true);
	const [screenStatus, setScreenStatus] = useState(true);
	const [requestsVisibility, setRequestsVisibility] = useState(true);
	const toggleVideo = () => {
		setVideoStatus((prev) => !prev);
	};

	const toggleMic = () => {
		setMicStatus((prev) => !prev);
	};

	const toggleScreen = () => {
		setScreenStatus((prev) => !prev);
	};

	const addRequestingUser = (key) => {
		callPeer(key);
		setRequestsVisibility(false);
	};

	const isHost = Object.values(users)[0] === yourID;

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			width="100%"
			padding={2}
			gap={10}
		>
			<Flex width="100%" justify="space-around">
				<Box
					backgroundColor="blackAlpha.400"
					width="48%"
					height="350px"
					borderRadius="lg"
				>
					{userVideo}
				</Box>
				<Box
					backgroundColor="blackAlpha.400"
					width="48%"
					height="350px"
					borderRadius="lg"
				>
					{guestVideo}
				</Box>
			</Flex>

			{/* {requestsVisibility && ( */}
			<Flex direction="column" width="90%" gap={4}>
				{/* {isHost && ( */}
				<Flex gap={2} justify="center" align="center">
					{Object.keys(users).map((key, index) => {
						if (key === yourID) {
							return null;
						}
						return (
							<Button
								key={index}
								onClick={() => addRequestingUser(key)}
								colorScheme="green"
							>
								Add Saagar
							</Button>
						);
					})}
				</Flex>
				{/* )} */}
				<Flex justify="center" align="center">
					{incomingCall}
				</Flex>
			</Flex>
			{/* )} */}
			<Flex
				width="50%"
				borderColor="white.600"
				borderRadius="md"
				borderWidth="2px"
				padding={2}
				direction="column"
				gap={2}
			>
				<Flex gap={10} justify="center" padding={4}>
					<IconButton
						variant="outline"
						colorScheme={videoStatus ? "gray" : "red"}
						borderRadius="100%"
						icon={
							videoStatus ? (
								<BsFillCameraVideoFill />
							) : (
								<BsFillCameraVideoOffFill />
							)
						}
						onClick={toggleVideo}
					/>
					<IconButton
						variant="outline"
						colorScheme={micStatus ? "gray" : "red"}
						borderRadius="100%"
						icon={micStatus ? <BsFillMicFill /> : <BsFillMicMuteFill />}
						onClick={toggleMic}
					/>
					<IconButton
						variant="outline"
						colorScheme={screenStatus ? "gray" : "red"}
						borderRadius="100%"
						icon={screenStatus ? <MdScreenShare /> : <MdStopScreenShare />}
						onClick={toggleScreen}
					/>
				</Flex>
			</Flex>
		</Box>
	);
}
