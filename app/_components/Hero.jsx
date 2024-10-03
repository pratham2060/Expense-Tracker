import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Home() {
  return (
    <section className="bg-gray" style={{ marginTop: '-70px' }}>
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto text-center">
          <h1 className="text-4xl font-extrabold sm:text-6xl text-gray-800">
            Manage Your Expenses
            <strong className="font-extrabold text-blue-600 sm:block">Control Your Money</strong>
          </h1>

          <p className="mt-4 sm:text-xl leading-relaxed text-gray-600">
            Start creating and tracking your budget today!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow-lg transition duration-300 ease-in-out transform hover:scale-105 sm:w-auto"
              href="/sign-up"
            >
              Get Started
            </Link>

            <Link
              className="block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 border border-blue-600 shadow-lg hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 sm:w-auto"
              href="/about"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      <Image 
        src={'/FinalDash.png'}
        width={1000}
        height={700}
        className='rounded-xl m-auto flex items-center' 
        style={{ marginTop: '-50px' }} 
        alt="Dashboard Illustration Image"
      />
      
      {/* New Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Why Choose Us?</h2>
          <p className="mt-2 text-gray-600">Discover powerful features designed to help you manage your finances effectively.</p>
          
          <div className="mt-8 grid grid-cols-1 gap-y-8 sm:grid-cols-2 md:grid-cols-3 gap-x-8">
            {/* Feature 1 */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Budget Tracking</h3>
              <p className="mt-2 text-gray-500">Easily track your spending and stay within your budget.</p>
            </div>
            {/* Feature 2 */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Expense Reports</h3>
              <p className="mt-2 text-gray-500">Generate detailed reports to analyze your spending habits.</p>
            </div>
            {/* Feature 3 */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Savings Goals</h3>
              <p className="mt-2 text-gray-500">Set and track savings goals to achieve financial freedom.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-xl font-bold">Ready to take control of your finances?</h2>
        <Link
          href="/sign-up" 
          className="mt-4 inline-block rounded bg-white text-blue-600 px-6 py-3 font-medium transition duration-300 ease-in-out hover:bg-gray-200"
        >
          Start Now
        </Link>
      </div>
    </section>
  );
}

export default Home;