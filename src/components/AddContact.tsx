import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Input,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
	Button,
} from "@material-tailwind/react";
import { useAtom } from "jotai";

import { usersQueryAtom } from "@/state";
import { addContact } from "@/services";

type AddContactProps = {
	children: React.ReactNode;
	refreshContacts: () => void;
};

export function AddContact({ children, refreshContacts }: AddContactProps) {
	const [{ data }] = useAtom(usersQueryAtom);
	const [filteredUsers, setFilteredUsers] = useState(data);
	const [openDialog, setOpenDialog] = useState(false);
	const [selectedUsername, setSelectedUsername] = useState("");

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilteredUsers(
			data?.filter((item) =>
				item.username.toLowerCase().includes(event.target.value.toLowerCase()),
			),
		);
	};

	const addNewContact = (username: string) => {
		setOpenDialog(true);
		setSelectedUsername(username);
	};

	const confirmAddNewContact = async () => {
		await addContact(selectedUsername);
		setOpenDialog(false);
		refreshContacts();
	};

	const handleOpen = (value: unknown) => console.log(value);

	useEffect(() => {
		if (data) {
			setFilteredUsers(data);
		}
	}, [data]);

	return (
		<>
			<Dialog open={openDialog} size="sm" handler={handleOpen}>
				<DialogHeader>Add new contact</DialogHeader>
				<DialogBody>
					You are about to add {selectedUsername} as a contact
				</DialogBody>
				<DialogFooter>
					<Button
						variant="text"
						color="red"
						onClick={() => setOpenDialog(false)}
						className="mr-1"
					>
						<span>Cancel</span>
					</Button>
					<Button
						variant="gradient"
						color="green"
						onClick={confirmAddNewContact}
					>
						<span>Confirm</span>
					</Button>
				</DialogFooter>
			</Dialog>

			<Menu
				dismiss={{
					itemPress: true,
					// @ts-expect-error
					isRequired: {},
				}}
			>
				<MenuHandler>{children}</MenuHandler>
				<MenuList>
					<Input
						label="Search"
						containerProps={{
							className: "mb-4",
						}}
						onChange={handleSearch}
						crossOrigin={undefined}
					/>
					{filteredUsers?.map((item) => (
						<MenuItem
							key={item.username}
							onClick={() => addNewContact(item.username)}
						>
							{item.username}
						</MenuItem>
					))}
				</MenuList>
			</Menu>
		</>
	);
}
