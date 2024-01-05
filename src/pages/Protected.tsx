import React from "react";
import { Navigate } from "react-router-dom";
import { useAtomValue } from "jotai";

import { authenticatedAtom } from "@/utils";
import { signInRoute } from "@/routes";

type ProtectedProps = {
	children: React.ReactNode;
};

export function Protected({ children }: ProtectedProps) {
	const authenticated = useAtomValue(authenticatedAtom);
	if (!authenticated) {
		return <Navigate to={signInRoute} replace />;
	}
	return children;
}
