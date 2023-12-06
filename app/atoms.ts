import type {HomeTemplate, FooterData} from '@/app/lib/definitions';
import {atom} from 'jotai';
import {initialTemplateData, initialFooterData} from '@/app/lib/placeholder-data';

export const templateDataAtom = atom<HomeTemplate>(initialTemplateData);

export const footerDataAtom = atom<FooterData>(initialFooterData);
