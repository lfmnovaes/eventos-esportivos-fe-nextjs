import type {
  CompanyData,
  CategoryWithPrice,
  HomeTemplate,
  FooterData,
  EventData,
  FederalUnityParameters
} from '@/app/lib/definitions';
import {atom} from 'jotai';
import {
  initialCompaniesData,
  getInitialCategoriesData,
  getAllInitialTemplateHomeData,
  getAllInitialEventsData,
  getAllInitialFooterData,
  getAllInitialFUParametersData,
  getAllInitialPeriodParameters
} from '@/app/lib/mock-data';
import {formatCompaniesCategories} from '@/app/lib/data';

export const horizontalPaddingAtom = atom<string>(
  'px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16'
);

export const companiesDataAtom = atom<CompanyData[]>(initialCompaniesData);

export const formattedCompaniesCategoriesDataAtom = atom<
  Map<string, Map<number, CategoryWithPrice>>
>(
  formatCompaniesCategories(
    initialCompaniesData,
    getInitialCategoriesData(),
    getAllInitialEventsData()
  )
);

export const allTemplateDataAtom = atom<Map<string, HomeTemplate>>(getAllInitialTemplateHomeData());

export const allFooterDataAtom = atom<Map<string, FooterData>>(getAllInitialFooterData());

export const allEventsDataAtom = atom<Map<string, EventData[]>>(getAllInitialEventsData());

export const allFUParametersDataAtom = atom<Map<string, FederalUnityParameters>>(
  getAllInitialFUParametersData()
);

export const allPeriodParametersDataAtom = atom<Map<string, string[]>>(
  getAllInitialPeriodParameters()
);
