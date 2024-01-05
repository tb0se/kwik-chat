import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { IconButton, Typography } from "@material-tailwind/react";
import { MdAdd } from "react-icons/md";

import { AddContact, ChatItem, Profile } from "@/components";
import { SearchForm } from "@/forms";
import { authenticatedAtom, contactsAtom, contactsQueryAtom } from "@/state";
import { signInRoute } from "@/routes";

export function Home() {
	const authenticated = useAtomValue(authenticatedAtom);
	const [{ data, refetch }] = useAtom(contactsQueryAtom);
	const setContacts = useSetAtom(contactsAtom);

	if (!authenticated) {
		return <Navigate to={signInRoute} replace />;
	}

	useEffect(() => {
		if (data) {
			setContacts(data);
		}
	}, [data, setContacts]);

	return (
		<div className="flex flex-1">
			<aside className="flex flex-col p-4 max-w-60 border-r-2 border-solid border-charcoal h-full">
				<SearchForm />
				<div className="w-full flex justify-between items-center">
					<Typography variant="paragraph" color="white">
						Contacts
					</Typography>
					<AddContact refreshContacts={refetch}>
						<IconButton variant="text">
							<MdAdd
								style={{ color: "white", width: "1.25rem", height: "1.25rem" }}
							/>
						</IconButton>
					</AddContact>
				</div>
				<nav className="flex flex-col gap-4 flex-1">
					{data?.length ? (
						<ul>
							{data.map(({ id, username }, index) => (
								<ChatItem
									key={`${username}-${index}`}
									contactId={id}
									username={username}
								/>
							))}
						</ul>
					) : (
						<Typography
							variant="paragraph"
							color="white"
							className="text-center"
						>
							No contacts
						</Typography>
					)}
				</nav>
				<Profile />
			</aside>
			<article className="flex flex-col w-full px-6 pt-4">
				<Outlet />
			</article>
		</div>
	);
}
