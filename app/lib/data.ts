import type {
  CompanyData,
  HomeTemplate,
  FooterData,
  EventData,
  FederalUnityParameters,
  PeriodParameters,
  Category,
  CategoryWithPrice
} from '@/app/lib/definitions';
import {
  initialCompaniesData,
  getInitialCategoriesData,
  getAllInitialTemplateHomeData,
  getAllInitialFooterData,
  getAllInitialEventsData,
  getAllInitialFUParametersData,
  getAllInitialPeriodParameters
} from '@/app/lib/mock-data';

type DataReturnType = [
  CompanyData[],
  Map<string, Map<number, CategoryWithPrice>>,
  Map<string, HomeTemplate>,
  Map<string, FooterData>,
  Map<string, EventData[]>,
  Map<string, FederalUnityParameters>,
  Map<string, string[]>
];

const CACHE_TIME = 300; // 5 minutes

function getApiUrl(apiPath: string): string {
  const publicApiUrl = `${process.env.NEXT_PUBLIC_API_URL}${apiPath}`;
  const publicProxyUrl = process.env.NEXT_PUBLIC_PROXY_URL;
  const isDevelopment = process.env.NODE_ENV === 'development';

  return isDevelopment ? `${publicProxyUrl}${publicApiUrl}` : publicApiUrl;
}

async function getCompanies(): Promise<CompanyData[]> {
  const res = await fetch(getApiUrl('api/v1/companies'), {
    next: {revalidate: CACHE_TIME},
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  return res.json();
}

async function getCategoriesData(): Promise<Map<number, Category>> {
  const res = await fetch(getApiUrl('api/v1/events/categories'), {
    next: {revalidate: CACHE_TIME},
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  const categories = await res.json();
  const categoriesMap = new Map<number, Category>();

  categories.forEach((category: Category) => {
    categoriesMap.set(category.id, category);
  });

  return categoriesMap;
}

export function formatCompaniesCategories(
  companiesData: CompanyData[],
  categoryData: Map<number, Category>,
  allEventsData: Map<string, EventData[]>
): Map<string, Map<number, CategoryWithPrice>> {
  const companyCategoryMap = new Map<string, Map<number, CategoryWithPrice>>();

  for (const company of companiesData) {
    const categoriesWithPriceMap = new Map<number, CategoryWithPrice>();

    allEventsData.get(company.slug)?.forEach((event) => {
      event.categories.forEach((category) => {
        if (!categoriesWithPriceMap.has(category.id)) {
          const fullCategory = categoryData.get(category.id);
          if (fullCategory) {
            categoriesWithPriceMap.set(category.id, {...fullCategory, price: category.price});
          }
        }
      });
    });

    companyCategoryMap.set(company.slug, categoriesWithPriceMap);
  }

  return companyCategoryMap;
}

async function getAllTemplateHomeData(
  companiesData: CompanyData[]
): Promise<Map<string, HomeTemplate>> {
  const templateHomeDataMap = new Map<string, HomeTemplate>();

  for (const company of companiesData) {
    const res = await fetch(getApiUrl(`api/v1/companies/${company.id}/template_home`), {
      next: {revalidate: CACHE_TIME},
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    });

    const data = await res.json();
    templateHomeDataMap.set(company.slug, data);
  }

  return templateHomeDataMap;
}

async function getAllEventsData(companiesData: CompanyData[]): Promise<Map<string, EventData[]>> {
  const eventsDataMap = new Map<string, EventData[]>();

  for (const company of companiesData) {
    const res = await fetch(getApiUrl(`api/v1/companies/${company.id}/events`), {
      next: {revalidate: CACHE_TIME},
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    });

    const data = await res.json();
    eventsDataMap.set(company.slug, data);
  }

  return eventsDataMap;
}

async function getAllFooterData(companiesData: CompanyData[]): Promise<Map<string, FooterData>> {
  const footerDataMap = new Map<string, FooterData>();

  for (const company of companiesData) {
    const res = await fetch(getApiUrl(`api/v1/companies/${company.id}/footer`), {
      next: {revalidate: CACHE_TIME},
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    });

    const data = await res.json();
    footerDataMap.set(company.slug, data);
  }

  return footerDataMap;
}

async function getAllFUParametersData(
  companiesData: CompanyData[]
): Promise<Map<string, FederalUnityParameters>> {
  const FUParametersDataMap = new Map<string, FederalUnityParameters>();

  for (const company of companiesData) {
    const res = await fetch(getApiUrl(`api/v1/companies/${company.id}/federal_unity`), {
      next: {revalidate: CACHE_TIME},
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    });

    const data = await res.json();
    FUParametersDataMap.set(company.slug, data);
  }

  return FUParametersDataMap;
}

async function getAllPeriodParameters(
  companiesData: CompanyData[]
): Promise<Map<string, string[]>> {
  const periodParametersDataMap = new Map<string, string[]>();

  for (const company of companiesData) {
    const res = await fetch(getApiUrl(`api/v1/companies/${company.id}/periods`), {
      next: {revalidate: CACHE_TIME},
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    });

    const periodParameters: PeriodParameters = await res.json();
    const formattedPeriodParameters = [];

    for (const year in periodParameters) {
      for (const month of periodParameters[year]) {
        formattedPeriodParameters.push(`${year}-${month.toString().padStart(2, '0')}`);
      }
    }

    periodParametersDataMap.set(company.slug, formattedPeriodParameters);
  }

  return periodParametersDataMap;
}

const useMockDataInDev = true; // Change this to false to use actual API data in dev

export default async function getData(): Promise<DataReturnType> {
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (isDevelopment && useMockDataInDev) {
    return [
      initialCompaniesData,
      formatCompaniesCategories(
        initialCompaniesData,
        getInitialCategoriesData(),
        getAllInitialEventsData()
      ),
      getAllInitialTemplateHomeData(),
      getAllInitialFooterData(),
      getAllInitialEventsData(),
      getAllInitialFUParametersData(),
      getAllInitialPeriodParameters()
    ];
  } else {
    const [companiesData, categoriesData] = await Promise.all([
      getCompanies(),
      getCategoriesData()
    ]);
    const [
      allTemplateData,
      allFooterData,
      allEventsData,
      allFUParametersData,
      allPeriodPametersData
    ] = await Promise.all([
      getAllTemplateHomeData(companiesData),
      getAllFooterData(companiesData),
      getAllEventsData(companiesData),
      getAllFUParametersData(companiesData),
      getAllPeriodParameters(companiesData)
    ]);
    const formattedCompaniesCategories = formatCompaniesCategories(
      companiesData,
      categoriesData,
      allEventsData
    );
    return [
      companiesData,
      formattedCompaniesCategories,
      allTemplateData,
      allFooterData,
      allEventsData,
      allFUParametersData,
      allPeriodPametersData
    ];
  }
}
