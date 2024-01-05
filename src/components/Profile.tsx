import { Avatar, Typography } from "@material-tailwind/react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/state";

export function Profile() {
	const user = useAtomValue(userAtom);
	return (
		<section className="flex items-center gap-3 w-full cursor-pointer">
			<Avatar
				src={
					user?.avatar || "https://docs.material-tailwind.com/img/face-2.jpg"
				}
				alt="avatar"
			/>
			<Typography variant="h4" color="white">
				{user?.username || ""}
			</Typography>
		</section>
	);
}
