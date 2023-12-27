'use client';

import type {
  HomeTemplate,
  FooterData,
  EventData,
  FederalUnityParameters,
  PeriodParameters,
  CompanyData
} from '@/app/lib/definitions';
import {useHydrateAtoms} from 'jotai/utils';
import {
  companiesDataAtom,
  allTemplateDataAtom,
  allFooterDataAtom,
  allEventsDataAtom,
  allFUParametersAtom,
  periodParametersAtom
} from '@/app/atoms';

export default function Store({
  companiesData,
  allTemplateData,
  allFooterData,
  allEventsData,
  allFUParametersData,
  periodParameters
}: {
  companiesData: CompanyData[];
  allTemplateData: Map<string, HomeTemplate>;
  allFooterData: Map<string, FooterData>;
  allEventsData: Map<string, EventData[]>;
  allFUParametersData: Map<string, FederalUnityParameters>;
  periodParameters: PeriodParameters;
}) {
  useHydrateAtoms([
    [companiesDataAtom, companiesData],
    [allTemplateDataAtom, allTemplateData],
    [allFooterDataAtom, allFooterData],
    [allEventsDataAtom, allEventsData],
    [allFUParametersAtom, allFUParametersData],
    [periodParametersAtom, periodParameters]
  ] as const);
  return null;
}
