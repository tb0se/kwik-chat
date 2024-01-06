import axios from "axios";
import { ApiResponse, Contact } from "@/types";
import { contactsUrl } from "@/utils";

type ContactsResponse = {
	data: Contact[];
} & ApiResponse;

export const getContacts = async () => {
	try {
		const response = await axios.get<ContactsResponse>(contactsUrl, {
			withCredentials: true,
		});

		if (response.status === 200 && response.data.ok) {
			return response.data.data;
		}
		return [];
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("error message: ", error.message);
			return [];
		}
		console.error("unexpected error: ", error);
		throw new Error("Something happened. Please try again later");
	}
};

type AddContactResponse = {} & ApiResponse;

export const addContact = async (username: string) => {
	try {
		const response = await axios.post<AddContactResponse>(
			contactsUrl,
			{ username },
			{
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			},
		);

		if (response.status === 200 && response.data.ok) {
			return true;
		}
		return false;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("error message: ", error.message);
			return false;
		}
		console.error("unexpected error: ", error);
		throw new Error("Something happened. Please try again later");
	}
};
