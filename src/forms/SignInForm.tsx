import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdInfo } from "react-icons/md";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Input,
	Checkbox,
	Button,
	Alert,
} from "@material-tailwind/react";
import { useAtom, useSetAtom } from "jotai";

import { homeRoute, signUpRoute } from "@/routes";
import { Info, INFO_TYPE } from "@/components/Info";
import {
	authenticatedAtom,
	rememberMeAtom,
	signInAtom,
	userAtom,
	userQueryAtom,
} from "@/state";

type SignInFormValues = {
	username: string;
	password: string;
	rememberMe: boolean;
};

const SignInSchema = Yup.object().shape({
	username: Yup.string()
		.min(2, "Username must be 2 characters or more")
		.max(50, "Username must be 50 characters or less")
		.required("Username is required"),
	password: Yup.string()
		.min(8, "Password must be 8 characters or more")
		.required("Password is required"),
	rememberMe: Yup.boolean(),
});

export function SignInForm() {
	const [open, setOpen] = useState(true);
	const [{ data, isFetching, refetch, isError, error, isFetched, isSuccess }] =
		useAtom(userQueryAtom);
	const setSignIn = useSetAtom(signInAtom);
	const setAuthenticated = useSetAtom(authenticatedAtom);
	const setRememberMe = useSetAtom(rememberMeAtom);
	const setUser = useSetAtom(userAtom);
	const navigate = useNavigate();

	const formik = useFormik<SignInFormValues>({
		initialValues: {
			username: "",
			password: "",
			rememberMe: false,
		},
		onSubmit: (values) => {
			setSignIn(values);
			setRememberMe(values.rememberMe);
			refetch();
		},
		validationSchema: SignInSchema,
		validateOnMount: true,
	});

	useEffect(() => {
		setOpen(isError);
	}, [isError]);

	useEffect(() => {
		if (isSuccess && data) {
			setUser(data);
			setAuthenticated(true);
			navigate(homeRoute);
		}
	}, [isSuccess, setAuthenticated, navigate, data, setUser]);

	return (
		<>
			{isError && (
				<Alert
					icon={<MdInfo style={{ width: "1.25rem", height: "1.25rem" }} />}
					animate={{
						mount: { y: 10 },
						unmount: { y: -10 },
					}}
					open={open}
					className="w-fit absolute top-2 z-10 text-center flex items-center"
					onClose={() => setOpen(false)}
				>
					<Typography>{error?.message ?? "Something happened"}</Typography>
				</Alert>
			)}

			<Card className="w-96">
				<CardHeader
					variant="gradient"
					color="gray"
					className="mb-4 grid h-28 place-items-center"
				>
					<Typography variant="h3" color="white">
						Sign In
					</Typography>
				</CardHeader>
				<form onSubmit={formik.handleSubmit}>
					<CardBody className="flex flex-col gap-4">
						<div className="w-full">
							<Input
								label="Username"
								name="username"
								type="text"
								inputMode="text"
								autoComplete="nickname"
								size="lg"
								autoFocus
								crossOrigin={undefined}
								onChange={formik.handleChange}
								value={formik.values.username}
								error={formik.touched.username && !!formik.errors.username}
							/>
							{formik.touched.username && formik.errors.username ? (
								<Info type={INFO_TYPE.error} text={formik.errors.username} />
							) : null}
						</div>

						<div className="w-full">
							<Input
								label="Password"
								name="password"
								type="password"
								inputMode="text"
								autoComplete="current-password"
								size="lg"
								crossOrigin={undefined}
								onChange={formik.handleChange}
								value={formik.values.password}
								error={formik.touched.password && !!formik.errors.password}
							/>
							{formik.touched.password && formik.errors.password ? (
								<Info type={INFO_TYPE.error} text={formik.errors.password} />
							) : null}
						</div>

						<div className="-ml-2.5">
							<Checkbox
								label="Remember Me"
								name="rememberMe"
								crossOrigin={undefined}
								onChange={formik.handleChange}
								defaultChecked={formik.values.rememberMe}
							/>
							{formik.touched.rememberMe && formik.errors.rememberMe ? (
								<Info type={INFO_TYPE.error} text={formik.errors.rememberMe} />
							) : null}
						</div>
					</CardBody>
					<CardFooter className="pt-0">
						<Button
							type="submit"
							variant="gradient"
							fullWidth
							loading={isFetching && !isFetched}
						>
							Sign In
						</Button>
						<Typography variant="small" className="mt-6 flex justify-center">
							Don&apos;t have an account?
							<Link
								className="text-sm font-bold leading-normal antialiased block text-blue-gray-900 ml-1"
								to={signUpRoute}
							>
								Sign Up
							</Link>
						</Typography>
					</CardFooter>
				</form>
			</Card>
		</>
	);
}
