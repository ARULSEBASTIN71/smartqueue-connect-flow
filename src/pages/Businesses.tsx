
import React, { useState } from 'react';
import Layout from '../components/Layout';
import BusinessCard from '../components/BusinessCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchParams } from 'react-router-dom';

const Businesses = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  
  // Mock data for businesses
  const businesses = [
    {
      id: "1",
      name: "City Hospital",
      type: "Healthcare",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      address: "123 Main St, Cityville",
      waitTime: 25,
      isOpen: true
    },
    {
      id: "2",
      name: "Elegant Hair Salon",
      type: "Salon",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      address: "456 Style Ave, Fashiontown",
      waitTime: 15,
      isOpen: true
    },
    {
      id: "3",
      name: "First National Bank",
      type: "Banking",
      image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      address: "789 Finance Blvd, Moneyville",
      waitTime: 10,
      isOpen: true
    },
    {
      id: "4",
      name: "Department of Motor Vehicles",
      type: "Government",
      image: "https://images.unsplash.com/photo-1591189824935-9d329ca75ed8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      address: "101 Government Center, Statesville",
      waitTime: 45,
      isOpen: true
    },
    {
      id: "5",
      name: "Wellness Spa & Massage",
      type: "Salon",
      image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      address: "222 Relaxation Rd, Spaville",
      waitTime: 30,
      isOpen: true
    },
    {
      id: "6",
      name: "Community Hospital",
      type: "Healthcare",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      address: "333 Health Way, Medicaltown",
      waitTime: 35,
      isOpen: true
    },
    {
      id: "7",
      name: "Savings & Loans Credit Union",
      type: "Banking",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      address: "444 Credit St, Banktown",
      waitTime: 5,
      isOpen: true
    },
    {
      id: "8",
      name: "Passport Office",
      type: "Government",
      image: "https://images.unsplash.com/photo-1604842828803-031e5673d346?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      address: "555 Travel Pass Rd, Visatown",
      waitTime: 60,
      isOpen: true
    }
  ];
  
  // Filter based on category and search term
  const filteredBusinesses = businesses.filter(business => {
    const matchesCategory = selectedCategory === 'all' || 
                           business.type.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          business.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Handle category mapping
  const categoryMapping: Record<string, string> = {
    'healthcare': 'Healthcare',
    'salons': 'Salon',
    'banking': 'Banking',
    'government': 'Government',
  };
  
  // If the URL has a category parameter, map it to our internal category
  React.useEffect(() => {
    if (categoryParam && categoryMapping[categoryParam.toLowerCase()]) {
      setSelectedCategory(categoryMapping[categoryParam.toLowerCase()].toLowerCase());
    }
  }, [categoryParam]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Businesses Near You</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover local businesses offering queue management and book your spot in line or schedule an appointment.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                type="text"
                placeholder="Search by name or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select 
                value={selectedCategory} 
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="salon">Salons & Spas</SelectItem>
                  <SelectItem value="banking">Banking</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {filteredBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBusinesses.map(business => (
              <BusinessCard
                key={business.id}
                id={business.id}
                name={business.name}
                type={business.type}
                image={business.image}
                address={business.address}
                waitTime={business.waitTime}
                isOpen={business.isOpen}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">No businesses found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We couldn't find any businesses matching your search criteria. Try adjusting your filters or search term.
            </p>
            <Button 
              variant="outline" 
              className="mt-4 border-smartqueue-primary text-smartqueue-primary"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Businesses;
