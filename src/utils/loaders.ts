import { LoaderFunctionArgs } from "react-router-dom";
import { getMessages } from "@/services";

export const chatLoader = async ({ params }: LoaderFunctionArgs) => {
	const { contactId } = params;
	const messages = await getMessages(Number(contactId));
	return { contactId, messages };
};
