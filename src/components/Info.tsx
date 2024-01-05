import { Typography } from "@material-tailwind/react";
import type { TypographyProps } from "@material-tailwind/react";
import clsx from "clsx";
import { MdWarning, MdInfo } from "react-icons/md";

export enum INFO_TYPE {
	info = "info",
	warning = "warning",
	error = "error",
}

type InfoProps = {
	text: string;
	type?: INFO_TYPE;
};

export function Info({ text, type = INFO_TYPE.info }: InfoProps) {
	const textColor = clsx({
		gray: type === INFO_TYPE.info,
		orange: type === INFO_TYPE.warning,
		red: type === INFO_TYPE.error,
	});
	return (
		<Typography
			variant="small"
			color={textColor as TypographyProps["color"]}
			className="mt-2 flex items-center gap-1 font-normal"
		>
			{type === INFO_TYPE.info ? (
				<MdInfo style={{ width: "2rem", height: "2rem" }} />
			) : (
				<MdWarning style={{ width: "1.25rem", height: "1.25rem" }} />
			)}
			{text}
		</Typography>
	);
}
