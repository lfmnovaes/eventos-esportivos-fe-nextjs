import Footer from '@/app/ui/footer';
import Navbar from '@/app/ui/navbar';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Navbar />
      <main className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-white py-24 px-4 sm:px-8 md:px-12 lg:px-16">
        {children}
      </main>
      <Footer />
    </>
  );
}
