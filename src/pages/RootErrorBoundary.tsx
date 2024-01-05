import { Typography } from "@material-tailwind/react";
import { useRouteError } from "react-router-dom";

export function RootErrorBoundary() {
	const error = useRouteError();
	console.error(error);

	return (
		<main
			id="error-page"
			className="w-full min-h-screen flex flex-col items-center justify-center gap-4"
		>
			<Typography variant="h1" color="white">
				Oops!
			</Typography>
			<Typography variant="paragraph" color="white">
				Sorry, an unexpected error has occurred.
			</Typography>
			<Typography variant="small" color="white">
				{/* @ts-ignore */}
				<i>{error.statusText || error.message}</i>
			</Typography>
		</main>
	);
}
