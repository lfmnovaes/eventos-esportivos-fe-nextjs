'use client';

import type {
  HomeTemplate,
  FooterData,
  EventData,
  FUnityParameters,
  PeriodParameters
} from '@/app/lib/definitions';
import {useHydrateAtoms} from 'jotai/utils';
import {
  templateDataAtom,
  footerDataAtom,
  eventsDataAtom,
  federalUnityParametersAtom,
  periodParametersAtom
} from '@/app/atoms';

export default function Store({
  templateHomeData,
  footerData,
  eventsData,
  federalUnityParameters,
  periodParameters
}: {
  templateHomeData: HomeTemplate;
  footerData: FooterData;
  eventsData: EventData[];
  federalUnityParameters: FUnityParameters;
  periodParameters: PeriodParameters;
}) {
  useHydrateAtoms([
    [templateDataAtom, templateHomeData],
    [footerDataAtom, footerData],
    [eventsDataAtom, eventsData],
    [federalUnityParametersAtom, federalUnityParameters],
    [periodParametersAtom, periodParameters]
  ] as const);
  return null;
}
