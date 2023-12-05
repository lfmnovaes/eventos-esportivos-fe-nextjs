import {atom} from 'jotai';
import type {HomeTemplate} from '@/app/lib/definitions';

export const templateDataAtom = atom<HomeTemplate | undefined>(undefined);
