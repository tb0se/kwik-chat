import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import {
	Card,
	Input,
	Checkbox,
	Button,
	Typography,
	CardHeader,
	CardBody,
	CardFooter,
	Alert,
} from "@material-tailwind/react";
import { useAtom, useSetAtom } from "jotai";
import { MdInfo } from "react-icons/md";

import { homeRoute, signInRoute } from "@/routes";
import { Info, INFO_TYPE } from "@/components";
import {
	authenticatedAtom,
	signUpAtom,
	signUpQueryAtom,
	userAtom,
} from "@/state";
import { createAvatar } from "@/utils";

const SignUpSchema = Yup.object().shape({
	username: Yup.string()
		.min(2, "Username must be 2 characters or more")
		.max(50, "Username must be 50 characters or less")
		.required("Username is required"),
	email: Yup.string()
		.email("Email address is not valid")
		.required("Username is required"),
	password: Yup.string()
		.min(8, "Password must be 8 characters or more")
		.required("Password is required"),
	confirmPassword: Yup.string()
		.min(8, "Password must be 8 characters or more")
		.oneOf([Yup.ref("password"), ""], "Passwords must match")
		.required("Confirm password is required"),
	agreeToTermsAndConditions: Yup.boolean().required("Is required to proceed"),
});

type SignUpValues = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	agreeToTermsAndConditions: boolean;
};

export function SignUpForm() {
	const [open, setOpen] = useState(true);
	const setSignUp = useSetAtom(signUpAtom);
	const setUser = useSetAtom(userAtom);
	const setAuthenticated = useSetAtom(authenticatedAtom);
	const [{ data, isFetching, refetch, isError, error, isFetched, isSuccess }] =
		useAtom(signUpQueryAtom);
	const navigate = useNavigate();

	const formik = useFormik<SignUpValues>({
		initialValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			agreeToTermsAndConditions: false,
		},
		onSubmit: (values) => {
			const signUpValues = {
				...values,
				avatar: createAvatar(values.username),
				confirmPassword: undefined,
			};
			setSignUp(signUpValues);
			refetch();
		},
		validationSchema: SignUpSchema,
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
						Sign Up
					</Typography>
				</CardHeader>
				<form onSubmit={formik.handleSubmit}>
					<CardBody className="flex flex-col gap-4">
						<div className="w-full">
							<Input
								label="Username"
								name="username"
								size="lg"
								type="text"
								inputMode="text"
								autoComplete="nickname"
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
								label="Email"
								name="email"
								type="text"
								inputMode="email"
								autoComplete="email"
								size="lg"
								autoFocus
								crossOrigin={undefined}
								onChange={formik.handleChange}
								value={formik.values.email}
								error={formik.touched.email && !!formik.errors.email}
							/>
							{formik.touched.email && formik.errors.email ? (
								<Info type={INFO_TYPE.error} text={formik.errors.email} />
							) : null}
						</div>

						<div className="w-full">
							<Input
								label="Password"
								name="password"
								type="password"
								inputMode="text"
								autoComplete="new-password"
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

						<div>
							<Input
								label="Confirm Password"
								name="confirmPassword"
								type="password"
								inputMode="text"
								autoComplete="new-password"
								size="lg"
								crossOrigin={undefined}
								onChange={formik.handleChange}
								value={formik.values.confirmPassword}
								error={
									formik.touched.confirmPassword &&
									!!formik.errors.confirmPassword
								}
							/>
							{formik.touched.confirmPassword &&
							formik.errors.confirmPassword ? (
								<Info
									type={INFO_TYPE.error}
									text={formik.errors.confirmPassword}
								/>
							) : null}
						</div>

						<div className="-ml-2.5">
							<Checkbox
								label="I agree to the Terms and Conditions"
								name="agreeToTermsAndConditions"
								crossOrigin={undefined}
								onChange={formik.handleChange}
								defaultChecked={formik.values.agreeToTermsAndConditions}
							/>
							{formik.touched.agreeToTermsAndConditions &&
							formik.errors.agreeToTermsAndConditions ? (
								<Info
									type={INFO_TYPE.error}
									text={formik.errors.agreeToTermsAndConditions}
								/>
							) : null}
						</div>
					</CardBody>
					<CardFooter className="pt-0">
						<Button
							type="submit"
							variant="gradient"
							loading={isFetching && !isFetched}
							fullWidth
						>
							Sign Up
						</Button>

						<Typography variant="small" className="mt-6 flex justify-center">
							Already have an account?
							<Link
								className="text-sm font-bold leading-normal antialiased block text-blue-gray-900 ml-1"
								to={signInRoute}
							>
								Sign In
							</Link>
						</Typography>
					</CardFooter>
				</form>
			</Card>
		</>
	);
}
