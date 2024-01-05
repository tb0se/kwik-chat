import { atomWithQuery } from 'jotai-tanstack-query';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { LoginData, RegisterData, getUsers, login, register } from '@/services';
import { User } from '@/types';

export const userAtom = atomWithStorage<User | null>('user', null);

export const userQueryAtom = atomWithQuery<User>((get) => ({
	queryKey: ['login'],
	queryFn: () => login(get(signInAtom)),
	enabled: false,
	retry: false,
}));

export const signInAtom = atom<LoginData>({
	username: '',
	password: '',
	rememberMe: false,
});

export const signUpQueryAtom = atomWithQuery<User>((get) => ({
	queryKey: ['register'],
	queryFn: () => register(get(signUpAtom)),
	enabled: false,
	retry: false,
}));

export const signUpAtom = atom<RegisterData>({
	username: '',
	password: '',
	email: '',
	agreeToTermsAndConditions: false,
});

export const usersQueryAtom = atomWithQuery<User[]>(() => ({
	queryKey: ['users'],
	queryFn: () => getUsers(),
	retry: false,
}));
