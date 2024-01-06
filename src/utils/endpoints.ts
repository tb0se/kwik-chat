const baseUrl = import.meta.env.VITE_BE_BASE_URL;

export const loginUrl = `${baseUrl}/login`;
export const registerUrl = `${baseUrl}/register`;
export const checkAuthPath = `${baseUrl}/check-auth`;
export const profilePath = `${baseUrl}/profile`;

export const socketUrl = 'ws://localhost:5000/api/chat/ws';
export const contactsUrl = `${baseUrl}/contact`;
export const messagesUrl = `${baseUrl}/messages`;
export const avatarUrl = 'https://api.multiavatar.com/';
export const usersUrl = `${baseUrl}/users/`;
