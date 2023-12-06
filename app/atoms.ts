import type {HomeTemplate} from '@/app/lib/definitions';
import {atom} from 'jotai';
import {initialTemplateData} from '@/app/lib/placeholder-data';

export const templateDataAtom = atom<HomeTemplate>(initialTemplateData);
