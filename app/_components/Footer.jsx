import React from 'react';

function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold mb-4">Manage Your Expense</h2>
            <p className="text-gray-600 mb-4">Take control of your finances with our powerful expense management tool.</p>
            <p className="text-sm">© 2024 Manage Your Expense. All rights reserved.</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-blue-600">Home</a>
              </li>
              <li>
                <a href="/features" className="hover:text-blue-600">Features</a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-blue-600">Pricing</a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy-policy" className="hover:text-blue-600">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-of-service" className="hover:text-blue-600">Terms of Service</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-600">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;