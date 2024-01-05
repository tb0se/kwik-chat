import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const profileAtom = atomWithStorage('profile', {
	username: '',
	email: '',
	avatar: '',
});

export const authenticatedAtom = atom(false);
