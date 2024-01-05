import axios from 'axios';
import { ApiResponse, MessageResponse } from '@/types';
import { messagesUrl } from '@/utils';

type MessagesResponse = {
	data: MessageResponse[];
} & ApiResponse;

export const getMessages = async (contactId: number) => {
	try {
		const response = await axios.get<MessagesResponse>(
			`${messagesUrl}?contactId=${contactId}`,
			{
				withCredentials: true,
			}
		);

		if (response.status === 200 && response.data.ok) {
			return response.data.data;
		}
		return [];
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('error message: ', error.message);
			return [];
		}
		console.error('unexpected error: ', error);
		throw new Error('Something happened. Please try again later');
	}
};
