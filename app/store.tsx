'use client';

import type {HomeTemplate} from '@/app/lib/definitions';
import {useHydrateAtoms} from 'jotai/utils';
import {templateDataAtom} from '@/app/atoms';

export default function Store({
  templateHomeData
}: {
  templateHomeData: HomeTemplate;
}) {
  useHydrateAtoms([[templateDataAtom, templateHomeData]] as const);
  return null;
}
