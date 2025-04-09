
import React from 'react';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      title: "Find & Select a Business",
      description: "Browse through our platform to find businesses near you. Filter by category, location, or service type to find exactly what you need.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-smartqueue-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: "Join the Queue Remotely",
      description: "Get a digital token without physically visiting the location. Enter your details, select the service you need, and receive your token number.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-smartqueue-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      )
    },
    {
      title: "Track Your Queue Status",
      description: "Monitor your position in the queue in real-time. Get updates on estimated waiting time and current token being served.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-smartqueue-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Arrive Just in Time",
      description: "Get notifications as your turn approaches. Arrive at the location just before your token number is called, avoiding long wait times.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-smartqueue-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const benefits = [
    {
      title: "For Customers",
      items: [
        "Eliminate physical waiting time",
        "Join multiple queues remotely",
        "Real-time updates on wait times",
        "Notifications when your turn is approaching",
        "Simple appointment booking option",
        "View business information and services"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "For Businesses",
      items: [
        "Streamline customer flow management",
        "Reduce congestion in waiting areas",
        "Improve customer satisfaction",
        "Real-time analytics on queue performance",
        "Reduce no-shows with automated reminders",
        "Customizable service settings"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How SmartQueue Works</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Our platform makes queue management simple for both businesses and customers. Here's how the system works to save time and improve service efficiency.
          </p>
        </div>
        
        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <div className="h-10 w-10 rounded-full bg-smartqueue-light text-smartqueue-primary font-bold flex items-center justify-center mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Benefits Section */}
        <div className="bg-gray-50 rounded-xl p-8 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Benefits of SmartQueue</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform provides unique advantages for both customers and businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  {benefit.icon}
                  <h3 className="text-xl font-semibold ml-3">{benefit.title}</h3>
                </div>
                <ul className="space-y-2">
                  {benefit.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Got questions? We've got answers to the most common queries about SmartQueue.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Is SmartQueue free to use?</h3>
              <p className="text-gray-600">
                SmartQueue is free for customers. Businesses can choose from various subscription plans based on their needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-2">What happens if I miss my turn?</h3>
              <p className="text-gray-600">
                If you miss your turn, most businesses allow a grace period. You can also request to rejoin the queue, subject to business policies.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Can I join multiple queues at once?</h3>
              <p className="text-gray-600">
                Yes, you can join multiple queues across different businesses simultaneously, helping you manage your time efficiently.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-2">How accurate are the wait time estimates?</h3>
              <p className="text-gray-600">
                Wait times are estimated based on real-time data and historical patterns. While generally accurate, they can vary based on service complexity.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-smartqueue-primary to-smartqueue-secondary rounded-xl text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Skip the Queue?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of users who have already transformed their waiting experience with SmartQueue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/businesses">
              <Button className="bg-white text-smartqueue-primary hover:bg-gray-100">
                Find Businesses
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;
