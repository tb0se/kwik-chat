import { forwardRef } from "react";
import { Typography } from "@material-tailwind/react";
import { Message as MessageType } from "@/types";
import Message from "./Message";

type MessagesProps = {
	messages?: MessageType[];
};

export const Messages = forwardRef<HTMLDivElement, MessagesProps>(
	function Messages({ messages }, ref) {
		return (
			<div
				ref={ref}
				className="flex-1 flex flex-col gap-4 pt-2 overflow-y-scroll no-scrollbar"
			>
				{messages?.length ? (
					<>
						{messages.map(({ text, timestamp, fromUser }, index) => (
							<Message
								key={`${timestamp}-${index}`}
								text={text}
								timestamp={timestamp}
								fromUser={fromUser}
							/>
						))}
					</>
				) : (
					<Typography className="text-center" variant="paragraph" color="white">
						No messages
					</Typography>
				)}
			</div>
		);
	},
);
