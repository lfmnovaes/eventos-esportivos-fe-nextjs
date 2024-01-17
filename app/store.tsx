'use client';

import type {
  CompanyData,
  CategoryWithPrice,
  HomeTemplate,
  FooterData,
  EventData,
  FederalUnityParameters
} from '@/app/lib/definitions';
import {useHydrateAtoms} from 'jotai/utils';
import {
  companiesDataAtom,
  formattedCompaniesCategoriesDataAtom,
  allTemplateDataAtom,
  allFooterDataAtom,
  allEventsDataAtom,
  allFUParametersDataAtom,
  allPeriodParametersDataAtom
} from '@/app/atoms';

export default function Store({
  companiesData,
  formattedCompaniesCategories,
  allTemplateData,
  allFooterData,
  allEventsData,
  allFUParametersData,
  allPeriodParametersData
}: {
  companiesData: CompanyData[];
  formattedCompaniesCategories: Map<string, Map<number, CategoryWithPrice>>;
  allTemplateData: Map<string, HomeTemplate>;
  allFooterData: Map<string, FooterData>;
  allEventsData: Map<string, EventData[]>;
  allFUParametersData: Map<string, FederalUnityParameters>;
  allPeriodParametersData: Map<string, string[]>;
}) {
  useHydrateAtoms([
    [companiesDataAtom, companiesData],
    [formattedCompaniesCategoriesDataAtom, formattedCompaniesCategories],
    [allTemplateDataAtom, allTemplateData],
    [allFooterDataAtom, allFooterData],
    [allEventsDataAtom, allEventsData],
    [allFUParametersDataAtom, allFUParametersData],
    [allPeriodParametersDataAtom, allPeriodParametersData]
  ] as const);
  return null;
}
