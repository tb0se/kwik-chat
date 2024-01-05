import { Typography } from "@material-tailwind/react";

export function ErrorBoundary() {
	return (
		<div className="flex flex-1 justify-center items-center gap-2 w-full">
			<Typography variant="h1" color="white">
				Something happened
			</Typography>
			<Typography variant="paragraph" color="white">
				Please try again
			</Typography>
		</div>
	);
}
