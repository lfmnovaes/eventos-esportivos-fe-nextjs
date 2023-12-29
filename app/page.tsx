import type {
  CompanyData,
  HomeTemplate,
  FooterData,
  EventData,
  FederalUnityParameters,
  Period
} from '@/app/lib/definitions';
import Store from '@/app/store';
import {
  getAllInitialTemplateHomeData,
  initialCompaniesData,
  getAllInitialFooterData,
  getAllInitialEventsData,
  getAllInitialFederalUnityParameters,
  initialPeriods
} from '@/app/lib/mock-data';
import Link from 'next/link';

type DataReturnType = [
  CompanyData[],
  Map<string, HomeTemplate>,
  Map<string, FooterData>,
  Map<string, EventData[]>,
  Map<string, FederalUnityParameters>,
  Period
];

function getApiUrl(apiPath: string): string {
  const publicApiUrl = `${process.env.NEXT_PUBLIC_API_URL}${apiPath}`;
  const publicProxyUrl = process.env.NEXT_PUBLIC_PROXY_URL;
  const isDevelopment = process.env.NODE_ENV === 'development';

  return isDevelopment ? `${publicProxyUrl}${publicApiUrl}` : publicApiUrl;
}

async function getCompanies(): Promise<CompanyData[]> {
  const res = await fetch(getApiUrl('api/v1/companies'), {
    next: {revalidate: 3600},
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  return res.json();
}

async function getAllTemplateHomeData(
  companiesData: CompanyData[]
): Promise<Map<string, HomeTemplate>> {
  const templateHomeDataMap = new Map<string, HomeTemplate>();

  for (const company of companiesData) {
    const res = await fetch(getApiUrl(`api/v1/companies/${company.id}/template_home`), {
      next: {revalidate: 3600},
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    });

    const data = await res.json();
    templateHomeDataMap.set(company.slug, data);
  }

  return templateHomeDataMap;
}

async function getAllEventsData(companiesData: CompanyData[]): Promise<Map<string, EventData[]>> {
  const footerDataMap = new Map<string, EventData[]>();

  for (const company of companiesData) {
    const res = await fetch(getApiUrl(`api/v1/companies/${company.id}/events`), {
      next: {revalidate: 3600},
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    });

    const data = await res.json();
    footerDataMap.set(company.slug, data);
  }

  return footerDataMap;
}

async function getAllFooterData(companiesData: CompanyData[]): Promise<Map<string, FooterData>> {
  const footerDataMap = new Map<string, FooterData>();

  for (const company of companiesData) {
    const res = await fetch(getApiUrl(`api/v1/companies/${company.id}/footer`), {
      next: {revalidate: 3600},
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
  const footerDataMap = new Map<string, FederalUnityParameters>();

  for (const company of companiesData) {
    const res = await fetch(getApiUrl(`api/v1/companies/${company.id}/federal_unity`), {
      next: {revalidate: 3600},
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    });

    const data = await res.json();
    footerDataMap.set(company.slug, data);
  }

  return footerDataMap;
}

async function getAllPeriods(): Promise<Period> {
  // const res = await fetch(
  //   getApiUrl(`api/v1/companies/${process.env.NEXT_PUBLIC_COMPANY_ID}/periods`),
  //   {
  //     next: {revalidate: 7200},
  //     headers: {
  //       'X-Requested-With': 'XMLHttpRequest'
  //     }
  //   }
  // );

  // return res.json();
  return initialPeriods;
}

const useMockDataInDev = true; // Change this to false to use actual API data in dev

async function getData(): Promise<DataReturnType> {
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (isDevelopment && useMockDataInDev) {
    return [
      initialCompaniesData,
      getAllInitialTemplateHomeData(),
      getAllInitialFooterData(),
      getAllInitialEventsData(),
      getAllInitialFederalUnityParameters(),
      initialPeriods
    ];
  } else {
    const companiesData = await getCompanies();
    const [allTemplateData, allFooterData, allEventsData, allFUParametersData, allPeriods] =
      await Promise.all([
        getAllTemplateHomeData(companiesData),
        getAllFooterData(companiesData),
        getAllEventsData(companiesData),
        getAllFUParametersData(companiesData),
        getAllPeriods()
      ]);
    return [
      companiesData,
      allTemplateData,
      allFooterData,
      allEventsData,
      allFUParametersData,
      allPeriods
    ];
  }
}

export default async function Home() {
  const [
    companiesData,
    allTemplateData,
    allFooterData,
    allEventsData,
    allFUParametersData,
    allPeriods
  ] = await getData();

  return (
    <>
      <Store
        companiesData={companiesData}
        allTemplateData={allTemplateData}
        allFooterData={allFooterData}
        allEventsData={allEventsData}
        allFUParametersData={allFUParametersData}
        allPeriods={allPeriods}
      />
      <div className="p-32">
        <h1 className="text-4xl font-bold py-16">Apex hub</h1>
        {companiesData.map((company: CompanyData) => (
          <Link key={company.id} href={`/${company.slug}`}>
            {company.name}
          </Link>
        ))}
      </div>
    </>
  );
}
