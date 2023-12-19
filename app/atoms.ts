import type {HomeTemplate, FooterData, EventData} from '@/app/lib/definitions';
import {atom} from 'jotai';
import {initialTemplateData, initialFooterData, initialEventsData} from '@/app/lib/mock-data';

export const horizontalPaddingAtom = atom<string>('px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16');

export const templateDataAtom = atom<HomeTemplate>(initialTemplateData);

export const footerDataAtom = atom<FooterData>(initialFooterData);

export const eventsDataAtom = atom<EventData[]>(initialEventsData);

export const loginAtom = atom<boolean>(false);

