import {Navbar, SectionHero, SectionText, SectionEvents, SectionCalendar, Footer} from '@/app/ui';
import Store from '@/app/store';
import {initialTemplateData, initialFooterData, initialEventsData} from '@/app/lib/mock-data';

function getApiUrl(apiPath: string): string {
  const publicApiUrl = `${process.env.NEXT_PUBLIC_API_URL}${apiPath}`;
  const publicProxyUrl = process.env.NEXT_PUBLIC_PROXY_URL;
  const isDevelopment = process.env.NODE_ENV === 'development';

  return isDevelopment ? `${publicProxyUrl}${publicApiUrl}` : publicApiUrl;
}

async function getTemplateHomeData() {
  const res = await fetch(
    getApiUrl(`api/v1/companies/${process.env.NEXT_PUBLIC_COMPANY_ID}/template_home`),
    {
      next: {revalidate: 3600},
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
  );

  return res.json();
}

async function getFooterData() {
  const res = await fetch(
    getApiUrl(`api/v1/companies/${process.env.NEXT_PUBLIC_COMPANY_ID}/footer`),
    {
      next: {revalidate: 3600},
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
  );

  return res.json();
}

async function getEventsData() {
  const res = await fetch(
    getApiUrl(`api/v1/companies/${process.env.NEXT_PUBLIC_COMPANY_ID}/events`),
    {
      next: {revalidate: 600},
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
  );

  return res.json();
}

const useMockDataInDev = true; // Change this to false to use actual API data in dev

async function getData() {
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (isDevelopment && useMockDataInDev) {
    return [initialTemplateData, initialFooterData, initialEventsData];
  } else {
    const [templateData, footerData, initialEventsData] = await Promise.all([
      getTemplateHomeData(),
      getFooterData(),
      getEventsData()
    ]);
    return [templateData, footerData, initialEventsData];
  }
}

export default async function Home() {
  const [templateHomeData, footerData, eventsData] = await getData();

  return (
    <>
      <Store templateHomeData={templateHomeData} footerData={footerData} eventsData={eventsData} />
      <Navbar />
      <main className="flex flex-col items-center justify-between leading-5">
        <SectionHero />
        <SectionText />
        <SectionEvents />
        <SectionCalendar />
      </main>
      <Footer />
    </>
  );
}
