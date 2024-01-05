import { atom } from 'jotai';
import { Message } from '@/types';

export const messagesAtom = atom<Message[]>([]);
