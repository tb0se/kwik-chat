import { useEffect, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { Avatar, IconButton, Typography } from "@material-tailwind/react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { MdArrowBack } from "react-icons/md";

import { Messages } from "@/components";
import { MessageForm } from "@/forms";
import { messagesAtom, contactAtom, userAtom } from "@/state";
import { MessageResponse } from "@/types";
import { homeRoute } from "@/routes";

export function Chat() {
	const [messagesList, setMessages] = useAtom(messagesAtom);
	const contact = useAtomValue(contactAtom);
	const user = useAtomValue(userAtom);

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { contactId, messages } = useLoaderData();
	const navigate = useNavigate();
	const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

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
		<article className="flex flex-col w-full px-6 pt-4">
			<header className="flex gap-4 items-center w-full h-16">
				{isSmallDevice ? (
					<IconButton variant="text" onClick={() => navigate(homeRoute)}>
						<MdArrowBack
							style={{ color: "white", width: "1.25rem", height: "1.25rem" }}
						/>
					</IconButton>
				) : null}
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
		</article>
	);
}
