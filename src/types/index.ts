export type Message = {
	text: string;
	timestamp: string;
	fromUser: boolean;
};

export type MessageResponse = {
	id: number;
	readAt?: string;
	recipientId: number;
	senderId: number;
	sentAt: string;
	text: string;
};

export type ApiResponse = {
	ok: boolean;
	message: string;
};

export type Contact = {
	id: number;
	userId: number;
	username: string;
	avatar: string;
};

export type User = {
	id: string;
	username: string;
	email: string;
	avatar: string;
};
