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
import { chatLoader } from "@/utils";

const router = createBrowserRouter([
	{
		path: signInRoute,
		element: <SignIn />,
		errorElement: <RootErrorBoundary />,
	},
	{
		path: signUpRoute,
		element: <SignUp />,
		errorElement: <RootErrorBoundary />,
	},
	{
		path: homeRoute,
		element: <Home />,
		errorElement: <RootErrorBoundary />,
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
