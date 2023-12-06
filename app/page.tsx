import Image from 'next/image';
import Navbar from '@/app/ui/navbar';
import {SectionText, SectionEvents, SectionCalendar, Footer} from '@/app/ui';
import Store from '@/app/store';

function getApiUrl(apiPath: string): string {
  const publicApiUrl = `${process.env.NEXT_PUBLIC_API_URL}${apiPath}`;
  const publicProxyUrl = process.env.NEXT_PUBLIC_PROXY_URL;
  const isDevelopment = process.env.NODE_ENV === 'development';

  return isDevelopment ? `${publicProxyUrl}${publicApiUrl}` : publicApiUrl;
}

async function getTemplateHomeData() {
  const res = await fetch(getApiUrl('api/v1/companies/2/template_home'), {
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
  const [templateHomeData] = await Promise.all([getTemplateHomeData()]);

  return (
    <>
      <Store templateHomeData={templateHomeData} />
      <Navbar
        title={
          <Image src="/logo.png" alt="logo" width={235} height={53} priority />
        }
      />
      <main className="flex min-h-screen flex-col items-center justify-between leading-5">
        <section className="w-full h-screen relative">
          <Image
            src="/hero-desktop.jpg"
            alt="Hero image"
            fill
            style={{objectFit: 'cover', objectPosition: 'center'}}
            priority
          />
        </section>
        <SectionText />
        <SectionEvents />
        <SectionCalendar />
      </main>
      <Footer />
    </>
  );
}
