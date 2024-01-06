import { Navigate } from "react-router-dom";
import { useAtomValue } from "jotai";

import { SignUpForm } from "@/forms";
import { homeRoute } from "@/routes";
import { authenticatedAtom } from "@/state";

export function SignUp() {
	const authenticated = useAtomValue(authenticatedAtom);

	if (authenticated) {
		return <Navigate to={homeRoute} replace />;
	}
	return (
		<main className="flex flex-col items-center justify-center w-full min-h-screen px-4">
			<SignUpForm />
		</main>
	);
}
