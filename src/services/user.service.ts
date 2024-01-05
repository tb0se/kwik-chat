import axios from 'axios';
import { loginUrl, registerUrl, usersUrl } from '@/utils';
import { ApiResponse, User } from '@/types';

export type LoginData = {
	username: string;
	password: string;
	rememberMe: boolean;
};

type LoginResponse = {
	data: User;
} & ApiResponse;

export const login = async (requestData: LoginData) => {
	try {
		const response = await axios.post<LoginResponse>(loginUrl, requestData, {
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true,
		});

		const { data } = response;
		return data.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('error message: ', error.message);
			switch (error.message) {
				case 'Network Error':
					throw new Error('Offline. Please try again.');
				default:
					throw new Error('Incorrect credentials');
			}
		}
		console.error('unexpected error: ', error);
		throw new Error('Something happened. Please try again later');
	}
};

export type RegisterData = {
	username: string;
	password: string;
	email: string;
	agreeToTermsAndConditions: boolean;
};

type RegisterResponse = { data: User } & ApiResponse;

export const register = async (requestData: RegisterData) => {
	try {
		const response = await axios.post<RegisterResponse>(
			registerUrl,
			requestData,
			{
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			}
		);
		const { data } = response;
		return data.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('error message: ', error.message);
			switch (error.message) {
				case 'Network Error':
					throw new Error('Offline. Please try again.');
				default:
					throw new Error('Incorrect credentials');
			}
		}
		console.error('unexpected error: ', error);
		throw new Error('Something happened. Please try again later');
	}
};

type GetUsersResponse = {
	data: User[];
} & ApiResponse;

export const getUsers = async () => {
	try {
		const response = await axios.get<GetUsersResponse>(usersUrl, {
			withCredentials: true,
		});

		if (response.status === 200 && response.data.ok) {
			return response.data.data;
		}
		return [];
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('error message: ', error.message);
			return [];
		}
		console.error('unexpected error: ', error);
		throw new Error('Something happened. Please try again later');
	}
};
