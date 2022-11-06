import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	useDisclosure,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	Select,
	Textarea,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { getUser, insert } from "../../utils/supabase";
import { useState } from "react";
import { useRouter } from "next/router";

export default function RequestModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const router = useRouter();

	const technologies = ["JavaScript", "React", "Python", "Java"];

	const [subject, setSubject] = useState("");
	const [offer, setOffer] = useState(0);
	const [technology, setTechnology] = useState(technologies[0]);
	const [description, setDescription] = useState("");

	const labelMarginBottom = "0.2rem";
	const inputMarginBottom = "0.5rem";

	const changeSubject = (e) => {
		setSubject(e.target.value);
	};

	const changeOffer = (e) => {
		setOffer(Number(e.target.value));
	};

	const changeTechnology = (e) => {
		console.log(e.target.value);
		setTechnology(e.target.value);
	};

	const changeDescription = (e) => {
		setDescription(e.target.value);
	};

	async function submitHandler(e) {
		e.preventDefault();
		const user = await getUser();

		await insert("requests", {
			author: user.user_metadata.full_name,
			subject,
			technology,
			offer,
			description,
		});

		onClose();
		router.reload();
	}
	return (
		<>
			<Button size="xs" width={100} leftIcon={<AddIcon />} onClick={onOpen}>
				Add
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay
					bg="blackAlpha.300"
					backdropFilter="blur(10px) hsl(39, 100%, 50%)"
				/>
				<ModalContent backgroundColor="#1d1d1d">
					<ModalHeader>Add Request</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl>
							<FormLabel style={{ marginBottom: labelMarginBottom }}>
								Subject
							</FormLabel>
							<Input
								style={{ marginBottom: inputMarginBottom }}
								type="text"
								isRequired
								onChange={changeSubject}
							/>
							<FormLabel style={{ marginBottom: labelMarginBottom }}>
								Technology
							</FormLabel>
							<Select
								style={{ marginBottom: inputMarginBottom }}
								onChange={changeTechnology}
							>
								{technologies.map((tech, index) => {
									return (
										<option key={index} value={tech}>
											{tech}
										</option>
									);
								})}
							</Select>
							<FormLabel style={{ marginBottom: labelMarginBottom }}>
								Offer
							</FormLabel>
							<InputGroup style={{ marginBottom: inputMarginBottom }}>
								<InputLeftElement
									pointerEvents="none"
									color="gray.300"
									fontSize="1.2em"
								>
									$
								</InputLeftElement>
								<Input
									type="number"
									placeholder="Enter amount"
									onChange={changeOffer}
								/>
							</InputGroup>
							<FormLabel style={{ marginBottom: labelMarginBottom }}>
								Brief Description
							</FormLabel>
							<Textarea
								style={{ marginBottom: inputMarginBottom }}
								onChange={changeDescription}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="red" mr={3} onClick={onClose}>
							Close
						</Button>
						<Button
							variant="outline"
							colorScheme="green"
							type="submit"
							onClick={submitHandler}
						>
							Submit
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
