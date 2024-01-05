import { RefObject, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input } from "@material-tailwind/react";
import { useAtom, useAtomValue } from "jotai";
import useWebSocket, { ReadyState } from "react-use-websocket";

import { socketUrl } from "@/utils";
import { messagesAtom, userAtom } from "@/state";
import { Message, MessageResponse } from "@/types";

type MessageFormValues = {
	text: string;
};

const MessageFormSchema = Yup.object().shape({
	text: Yup.string()
		.min(1, "Text must be 2 characters or more")
		.max(50, "Text must be 50 characters or less")
		.required("Text is required"),
});

type MessageFormProps = {
	contactId: string;
	messageRef: RefObject<HTMLDivElement>;
};

export function MessageForm({ contactId, messageRef }: MessageFormProps) {
	const [messages, setMessages] = useAtom(messagesAtom);
	const user = useAtomValue(userAtom);
	const { sendJsonMessage, readyState, lastJsonMessage } =
		useWebSocket<MessageResponse>(socketUrl, {
			onMessage: (event) => console.log("Message received:", event),
			onError: (event) => console.error("WebSocket error:", event),
			onOpen: (event) => console.log("WebSocket opened:", event),
			onClose: (event) => console.log("WebSocket closed:", event),
		});

	const initialValues = {
		text: "",
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <messages needed>
	useEffect(() => {
		if (messageRef?.current) {
			messageRef.current.scrollTop = messageRef.current.scrollHeight;
		}
	}, [messages, messageRef]);

	useEffect(() => {
		if (lastJsonMessage) {
			const newMessage: Message = {
				text: lastJsonMessage.text,
				timestamp: lastJsonMessage.sentAt,
				fromUser: lastJsonMessage.senderId === Number(user?.id),
			};
			setMessages((prev) => [...prev, newMessage]);
		}
	}, [lastJsonMessage, setMessages, user]);

	const formik = useFormik<MessageFormValues>({
		initialValues,
		onSubmit: (values) => {
			sendJsonMessage({ contactId, text: values.text });

			formik.setFieldValue("text", "");
		},
		validationSchema: MessageFormSchema,
	});

	const connectionStatus = {
		[ReadyState.CONNECTING]: "Connecting",
		[ReadyState.OPEN]: "Open",
		[ReadyState.CLOSING]: "Closing",
		[ReadyState.CLOSED]: "Closed",
		[ReadyState.UNINSTANTIATED]: "Uninstantiated",
	}[readyState];
	console.log("[connection status]: ", connectionStatus);

	return (
		<footer className="py-2">
			<form onSubmit={formik.handleSubmit}>
				<div className="relative flex w-full max-w-[30rem]">
					<Input
						name="text"
						type="text"
						inputMode="text"
						autoComplete="off"
						autoFocus
						placeholder="Type a message"
						className="!border !border-charleston-green !bg-charleston-green text-white shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-white"
						labelProps={{
							className: "hidden",
						}}
						containerProps={{ className: "min-w-[100px]" }}
						onChange={formik.handleChange}
						value={formik.values.text}
						crossOrigin={undefined}
					/>
					<Button
						type="submit"
						size="sm"
						className="!absolute right-1 top-1 rounded"
					>
						Send
					</Button>
				</div>
			</form>
		</footer>
	);
}
