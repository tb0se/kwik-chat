import { Typography } from "@material-tailwind/react";
import { DateTime } from "luxon";
import clsx from "clsx";

type MessageProps = {
	text: string;
	timestamp?: string;
	fromUser: boolean;
};

export default function Message({ text, timestamp, fromUser }: MessageProps) {
	const messageClass = clsx("w-fit p-4 rounded-xl min-w-32", {
		"bg-charcoal": fromUser,
		"bg-charleston-green self-end": !fromUser,
	});
	return (
		<div className={messageClass}>
			<Typography variant="paragraph" color="white">
				{text}
			</Typography>
			<Typography variant="small" color="white" className="text-xs text-right">
				{DateTime.fromISO(timestamp ?? "").toFormat("HH:mm")}
			</Typography>
		</div>
	);
}
