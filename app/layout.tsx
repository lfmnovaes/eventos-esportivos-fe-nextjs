import type {Metadata} from 'next';
import './globals.css';
import {space_grotesk} from '@/app/ui/fonts';
import getData from '@/app/lib/data';
import Store from '@/app/store';
import Providers from '@/app/providers';

export const metadata: Metadata = {
  title: 'Eventos Esportivos',
  description: 'Powered by Plathanus'
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const [
    companiesData,
    formattedCompaniesCategories,
    allTemplateData,
    allFooterData,
    allEventsData,
    allFUParametersData,
    allPeriodParametersData
  ] = await getData();
  return (
    <html lang="en">
      <body className={space_grotesk.className}>
        <Providers>
          <Store
            companiesData={companiesData}
            formattedCompaniesCategories={formattedCompaniesCategories}
            allTemplateData={allTemplateData}
            allFooterData={allFooterData}
            allEventsData={allEventsData}
            allFUParametersData={allFUParametersData}
            allPeriodParametersData={allPeriodParametersData}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
