import Header from './_components/Header';
import Hero from './_components/Hero';
import Footer from './_components/Footer';
import Head from 'next/head';

export default function Home() {
  return (
    <>
    <Head> 
        <title>Hisabh - Get ready to manage your expenses</title> 
    </Head>
    <div className='relative'>
      <Header />
      <Hero />
      <Footer />
    </div>
    </>
  );
}
