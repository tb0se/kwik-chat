import { Typography } from "@material-tailwind/react";

export function Landing() {
	return (
		<section className="flex-1 flex flex-col justify-center items-center gap-2">
			<Typography variant="h1" color="white">
				Welcome to Kwik Chat
			</Typography>
			<Typography variant="paragraph" color="white">
				Select a contact to get started.
			</Typography>
		</section>
	);
}
