import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { Avatar, Typography } from "@material-tailwind/react";

import { Messages } from "@/components";
import { MessageForm } from "@/forms";
import { messagesAtom, contactAtom, userAtom } from "@/state";
import { MessageResponse } from "@/types";

export function Chat() {
	const [messagesList, setMessages] = useAtom(messagesAtom);
	const contact = useAtomValue(contactAtom);
	const user = useAtomValue(userAtom);

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { contactId, messages } = useLoaderData();

	const messagesRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMessages(
			messages.map((message: MessageResponse) => ({
				text: message.text,
				timestamp: message.sentAt,
				fromUser: message.senderId === Number(user?.id),
			})),
		);
	}, [messages, setMessages, user]);

	return (
		<>
			<header className="flex gap-4 items-center w-full h-16">
				<Avatar
					src={
						contact.avatar ||
						"https://docs.material-tailwind.com/img/face-2.jpg"
					}
					alt="avatar"
				/>
				<Typography variant="h3" color="white">
					{contact.username}
				</Typography>
			</header>
			<Messages ref={messagesRef} messages={messagesList} />
			<MessageForm contactId={contactId} messageRef={messagesRef} />
		</>
	);
}
