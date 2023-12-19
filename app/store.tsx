'use client';

import type {HomeTemplate, FooterData, EventData} from '@/app/lib/definitions';
import {useHydrateAtoms} from 'jotai/utils';
import {templateDataAtom, footerDataAtom, eventsDataAtom} from '@/app/atoms';

export default function Store({
  templateHomeData,
  footerData,
  eventsData
}: {
  templateHomeData: HomeTemplate;
  footerData: FooterData;
  eventsData: EventData[];
}) {
  useHydrateAtoms([
    [templateDataAtom, templateHomeData],
    [footerDataAtom, footerData],
    [eventsDataAtom, eventsData]
  ] as const);
  return null;
}
