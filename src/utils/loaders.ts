import { LoaderFunctionArgs } from 'react-router-dom';
import { checkAuth } from '.';
import { getMessages } from '@/services';

export const chatLoader = async ({ params }: LoaderFunctionArgs) => {
	const { contactId } = params;
	const messages = await getMessages(Number(contactId));
	return { contactId, messages };
};

export const authLoader = async () => {
	const authenticated = await checkAuth();
	return { authenticated };
};
