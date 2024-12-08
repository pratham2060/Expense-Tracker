import Header from './_components/Header';
import Hero from './_components/Hero';
import Footer from './_components/Footer';
import Head from 'next/head';

export default function Home() {
  return (
    <div className='relative'>
    <Head> 
      <title>Hisabh - Get ready to manage your expenses</title> 
    </Head>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
