import { Navigate, useLoaderData } from "react-router-dom";
import { useSetAtom } from "jotai";
import { SignInForm } from "@/forms";
import { homeRoute } from "@/routes";
import { authenticatedAtom } from "@/utils";

export function SignIn() {
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
			<SignInForm />
		</main>
	);
}
