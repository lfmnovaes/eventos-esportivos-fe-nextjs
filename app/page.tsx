import {Navbar, SectionHero, SectionText, SectionEvents, SectionCalendar, Footer} from '@/app/ui';
import Store from '@/app/store';
import {initialTemplateData, initialFooterData} from '@/app/lib/mock-data';

function getApiUrl(apiPath: string): string {
  const publicApiUrl = `${process.env.NEXT_PUBLIC_API_URL}${apiPath}`;
  const publicProxyUrl = process.env.NEXT_PUBLIC_PROXY_URL;
  const isDevelopment = process.env.NODE_ENV === 'development';

  return isDevelopment ? `${publicProxyUrl}${publicApiUrl}` : publicApiUrl;
}

async function getTemplateHomeData() {
  const res = await fetch(getApiUrl('api/v1/companies/2/template_home'), {
    next: {revalidate: 600},
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  return res.json();
}

async function getFooterData() {
  const res = await fetch(getApiUrl('api/v1/companies/2/footer'), {
    next: {revalidate: 600},
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  return res.json();
}

const useMockDataInDev = true; // Change this to false to use actual API data in dev

async function getData() {
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (isDevelopment && useMockDataInDev) {
    return [initialTemplateData, initialFooterData];
  } else {
    const [templateData, footerData] = await Promise.all([getTemplateHomeData(), getFooterData()]);
    return [templateData, footerData];
  }
}

export default async function Home() {
  const [templateHomeData, footerData] = await getData();

  return (
    <>
      <Store templateHomeData={templateHomeData} footerData={footerData} />
      <Navbar />
      <main className="flex flex-col items-center justify-between leading-5">
        <SectionHero />
        <SectionText className="px-8 md:px-16" />
        <SectionEvents className="px-8 md:px-16" />
        <SectionCalendar className="px-8 md:px-16" />
      </main>
      <Footer />
    </>
  );
}
