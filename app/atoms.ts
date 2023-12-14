import type {HomeTemplate, FooterData} from '@/app/lib/definitions';
import {atom} from 'jotai';
import {initialTemplateData, initialFooterData} from '@/app/lib/mock-data';

export const templateDataAtom = atom<HomeTemplate>(initialTemplateData);

export const footerDataAtom = atom<FooterData>(initialFooterData);

export const loginAtom = atom<boolean>(false);

export const horizontalPaddingAtom = atom<string>('px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16');
