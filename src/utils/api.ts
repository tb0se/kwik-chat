import axios from "axios";
import { checkAuthPath } from "./endpoints";

type CheckAuthResponse = {
	ok: boolean;
	message: string;
};

export const checkAuth = async () => {
	try {
		const response = await axios.get<CheckAuthResponse>(checkAuthPath, {
			withCredentials: true,
		});
		return response.status === 200 && response.data.ok;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("error message: ", error.message);
			return false;
		}
		console.error("unexpected error: ", error);
		throw new Error("Something happened. Please try again later");
	}
};
