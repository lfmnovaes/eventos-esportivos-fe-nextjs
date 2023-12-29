'use client';

import type {
  HomeTemplate,
  FooterData,
  EventData,
  FederalUnityParameters,
  CompanyData,
  Period
} from '@/app/lib/definitions';
import {useHydrateAtoms} from 'jotai/utils';
import {
  companiesDataAtom,
  allTemplateDataAtom,
  allFooterDataAtom,
  allEventsDataAtom,
  allFUParametersAtom,
  allPeriodsAtom
} from '@/app/atoms';

export default function Store({
  companiesData,
  allTemplateData,
  allFooterData,
  allEventsData,
  allFUParametersData,
  allPeriods
}: {
  companiesData: CompanyData[];
  allTemplateData: Map<string, HomeTemplate>;
  allFooterData: Map<string, FooterData>;
  allEventsData: Map<string, EventData[]>;
  allFUParametersData: Map<string, FederalUnityParameters>;
  allPeriods: Period;
}) {
  useHydrateAtoms([
    [companiesDataAtom, companiesData],
    [allTemplateDataAtom, allTemplateData],
    [allFooterDataAtom, allFooterData],
    [allEventsDataAtom, allEventsData],
    [allFUParametersAtom, allFUParametersData],
    [allPeriodsAtom, allPeriods]
  ] as const);
  return null;
}
