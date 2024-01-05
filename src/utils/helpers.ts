import { avatarUrl } from ".";

export const createAvatar = (username: string) => {
	return `${avatarUrl}${username}.svg`;
};
