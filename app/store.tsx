'use client';

import type {HomeTemplate, FooterData} from '@/app/lib/definitions';
import {useHydrateAtoms} from 'jotai/utils';
import {templateDataAtom, footerDataAtom} from '@/app/atoms';

export default function Store({
  templateHomeData,
  footerData
}: {
  templateHomeData: HomeTemplate;
  footerData: FooterData;
}) {
  useHydrateAtoms([
    [templateDataAtom, templateHomeData],
    [footerDataAtom, footerData]
  ] as const);
  return null;
}
