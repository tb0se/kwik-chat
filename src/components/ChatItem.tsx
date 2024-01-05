import { NavLink } from "react-router-dom";
import { Avatar, Typography } from "@material-tailwind/react";
import { useSetAtom } from "jotai";
import { contactIdAtom } from "@/state";

type ChatItemProps = {
	contactId: number;
	avatar?: string;
	username: string;
	lastMessage?: string;
};

export function ChatItem({
	contactId,
	avatar = "https://docs.material-tailwind.com/img/face-2.jpg",
	username,
	lastMessage = "",
}: ChatItemProps) {
	const setContactId = useSetAtom(contactIdAtom);

	return (
		<li
			className="w-full cursor-pointer p-2 hover:shadow-xl hover:shadow-charcoal rounded-lg"
			onClick={() => setContactId(contactId)}
			onKeyDown={() => {}}
		>
			<NavLink to={`chat/${contactId}`} className="flex items-center gap-4 ">
				<Avatar src={avatar} alt="avatar" />
				<div>
					<Typography variant="h6" color="white">
						{username}
					</Typography>
					<Typography
						variant="small"
						color="white"
						className="font-normal max-w-32 w-full overflow-hidden whitespace-nowrap text-ellipsis text-xs"
					>
						{lastMessage}
					</Typography>
				</div>
			</NavLink>
		</li>
	);
}
