import {Navbar, SectionHero, SectionText, SectionEvents, SectionCalendar, Footer} from '@/app/ui';
import Store from '@/app/store';

function getApiUrl(apiPath: string): string {
  const publicApiUrl = `${process.env.NEXT_PUBLIC_API_URL}${apiPath}`;
  const publicProxyUrl = process.env.NEXT_PUBLIC_PROXY_URL;
  const isDevelopment = process.env.NODE_ENV === 'development';

  return isDevelopment ? `${publicProxyUrl}${publicApiUrl}` : publicApiUrl;
}

async function getTemplateHomeData() {
  const res = await fetch(getApiUrl('api/v1/companies/2/template_home'), {
    next: { revalidate: 600 },
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  if (!res.ok) {
    console.error('API Error Response:', await res.text());
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function getFooterData() {
  const res = await fetch(getApiUrl('api/v1/companies/2/footer'), {
    next: { revalidate: 600 },
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  if (!res.ok) {
    console.error('API Error Response:', await res.text());
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const [templateHomeData, footerData] = await Promise.all([
    getTemplateHomeData(),
    getFooterData()
  ]);

  return (
    <>
      <Store templateHomeData={templateHomeData} footerData={footerData} />
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between leading-5">
        <SectionHero />
        <SectionText />
        <SectionEvents />
        <SectionCalendar />
      </main>
      <Footer />
    </>
  );
}
