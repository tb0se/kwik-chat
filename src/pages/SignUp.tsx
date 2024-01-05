import { Navigate, useLoaderData } from "react-router-dom";
import { useSetAtom } from "jotai";

import { SignUpForm } from "@/forms";
import { authenticatedAtom } from "@/utils";
import { homeRoute } from "@/routes";

export function SignUp() {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { authenticated } = useLoaderData();
	const setAuthenticated = useSetAtom(authenticatedAtom);

	if (authenticated) {
		setAuthenticated(authenticated);
		return <Navigate to={homeRoute} replace />;
	}
	return (
		<main className="flex flex-col items-center justify-center w-full min-h-screen">
			<SignUpForm />
		</main>
	);
}
