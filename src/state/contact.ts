import { atomWithQuery } from "jotai-tanstack-query";
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

import { getContacts } from "@/services";
import { Contact } from "@/types";

export const contactIdAtom = atomWithStorage<number>("contactId", 0);

export const contactsQueryAtom = atomWithQuery<Contact[]>(() => ({
	queryKey: ["contacts"],
	queryFn: () => getContacts(),
	retry: false,
}));

export const contactsAtom = atomWithStorage<Contact[]>("contacts", []);

export const contactAtom = atom<Contact>(
	(get) =>
		get(contactsAtom)?.find((item) => item.id === get(contactIdAtom)) ?? {
			id: 0,
			userId: 0,
			username: "",
			avatar: "",
		},
);
