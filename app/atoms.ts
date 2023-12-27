import type {
  CompanyData,
  HomeTemplate,
  FooterData,
  EventData,
  FederalUnityParameters,
  PeriodParameters
} from '@/app/lib/definitions';
import {atom} from 'jotai';
import {
  getAllInitialTemplateHomeData,
  initialCompaniesData,
  initialPeriodParameters,
  getAllInitialEventsData,
  getAllInitialFooterData,
  getAllInitialFederalUnityParameters
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

export const periodParametersAtom = atom<PeriodParameters>(initialPeriodParameters);

export const loginAtom = atom<boolean>(false);
