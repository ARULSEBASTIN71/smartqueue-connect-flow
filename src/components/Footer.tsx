
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-smartqueue-primary to-smartqueue-secondary flex items-center justify-center text-white font-bold">
                SQ
              </div>
              <span className="text-xl font-bold gradient-text">SmartQueue</span>
            </Link>
            <p className="mt-4 text-gray-600">
              Digital token management system for businesses and customers. Skip the long wait times and manage your queue efficiently.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">For Businesses</h3>
            <ul className="space-y-2">
              <li><Link to="/business-signup" className="text-gray-600 hover:text-smartqueue-primary">Register Your Business</Link></li>
              <li><Link to="/business-dashboard" className="text-gray-600 hover:text-smartqueue-primary">Business Dashboard</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-smartqueue-primary">Pricing</Link></li>
              <li><Link to="/case-studies" className="text-gray-600 hover:text-smartqueue-primary">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">For Customers</h3>
            <ul className="space-y-2">
              <li><Link to="/businesses" className="text-gray-600 hover:text-smartqueue-primary">Find Businesses</Link></li>
              <li><Link to="/token-status" className="text-gray-600 hover:text-smartqueue-primary">Check Token Status</Link></li>
              <li><Link to="/appointment" className="text-gray-600 hover:text-smartqueue-primary">Book Appointment</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-smartqueue-primary">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-smartqueue-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">support@smartqueue.com</span>
              </li>
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-smartqueue-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-smartqueue-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-600">123 Queue Street, Digital City</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2025 SmartQueue. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-smartqueue-primary">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 text-sm hover:text-smartqueue-primary">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-500 text-sm hover:text-smartqueue-primary">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
