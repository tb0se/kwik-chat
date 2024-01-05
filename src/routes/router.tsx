import { createBrowserRouter } from "react-router-dom";
import {
	SignIn,
	SignUp,
	Home,
	Landing,
	RootErrorBoundary,
	Chat,
	ErrorBoundary,
} from "@/pages";
import { chatRoute, homeRoute, signInRoute, signUpRoute } from ".";
import { chatLoader, authLoader } from "@/utils";

const router = createBrowserRouter([
	{
		path: signInRoute,
		element: <SignIn />,
		errorElement: <RootErrorBoundary />,
		loader: authLoader,
	},
	{
		path: signUpRoute,
		element: <SignUp />,
		errorElement: <RootErrorBoundary />,
		loader: authLoader,
	},
	{
		path: homeRoute,
		element: <Home />,
		errorElement: <RootErrorBoundary />,
		// loader: authLoader,
		children: [
			{
				index: true,
				element: <Landing />,
			},
			{
				element: <Chat />,
				path: chatRoute,
				loader: chatLoader,
				errorElement: <ErrorBoundary />,
			},
		],
	},
]);

export default router;
