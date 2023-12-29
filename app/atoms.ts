import type {
  CompanyData,
  HomeTemplate,
  FooterData,
  EventData,
  FederalUnityParameters,
  Period
} from '@/app/lib/definitions';
import {atom} from 'jotai';
import {
  initialCompaniesData,
  getAllInitialTemplateHomeData,
  getAllInitialEventsData,
  getAllInitialFooterData,
  getAllInitialFederalUnityParameters,
  initialPeriods
} from '@/app/lib/mock-data';

export const horizontalPaddingAtom = atom<string>(
  'px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16'
);

export const companiesDataAtom = atom<CompanyData[]>(initialCompaniesData);

export const allTemplateDataAtom = atom<Map<string, HomeTemplate>>(getAllInitialTemplateHomeData());

export const allFooterDataAtom = atom<Map<string, FooterData>>(getAllInitialFooterData());

export const allEventsDataAtom = atom<Map<string, EventData[]>>(getAllInitialEventsData());

export const allFUParametersAtom = atom<Map<string, FederalUnityParameters>>(
  getAllInitialFederalUnityParameters()
);

//export const allPeriodParametersAtom = atom<Map<string, PeriodParameters>>(getAllInitialPeriodParameters());

export const allPeriodsAtom = atom<Period>(initialPeriods);

export const loginAtom = atom<boolean>(false);
