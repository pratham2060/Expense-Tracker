import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/app/_components/Footer';

const AboutPage = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Take Charge of Your Finances</h1>
          <p className="text-xl mb-8">Our app empowers you to effortlessly create and manage budgets, track your spending, and gain insights into your financial habits.</p>
          <Link href="/signup" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300">
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Create Budgets", description: "Set up personalized budgets to track your income and expenses.", icon: "📊" },
              { title: "Track Expenses", description: "Log every transaction to keep a detailed record of your spending.", icon: "💰" },
              { title: "Progress Visualization", description: "See real-time progress on your spending with intuitive graphs.", icon: "📈" },
              { title: "Expense Categorization", description: "Organize expenses into categories for a clearer overview of your finances.", icon: "🏷️" },
              { title: "Secure & Private", description: "Your financial data is encrypted and stored securely.", icon: "🔒" },
              { title: "Multi-Device Access", description: "Access your budgets from any device, anywhere.", icon: "📱" },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className='flex justify-between items-center'>
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <p className='text-sm text-red-600'>*Thses are not actual reviews</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                  JD
                </div>
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-gray-600">Financial Analyst</p>
                </div>
              </div>
              <p className="text-gray-700">"This app has revolutionized how I manage my personal finances. The insights it provides are invaluable!"</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                  JS
                </div>
                <div>
                  <h3 className="font-semibold">Jane Smith</h3>
                  <p className="text-gray-600">Small Business Owner</p>
                </div>
              </div>
              <p className="text-gray-700">"As a business owner, this app has been a game-changer. It's helped me keep my personal and business expenses organized and under control."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Made By Section */}
      <section className="bg-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-gray-700 text-lg">
            This site was made by Prathamesh Charoskar and is open-source on GitHub. Check out the code 
            <Link href="https://github.com/pratham2060/Expense-Tracker.git" className="text-blue-600 underline hover:text-blue-800 transition duration-300">
              here
            </Link>.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default AboutPage;
