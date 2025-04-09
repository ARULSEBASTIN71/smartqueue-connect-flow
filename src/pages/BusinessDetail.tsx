
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BusinessDetail = () => {
  const { id } = useParams();
  
  // Mock data for a business
  const business = {
    id: id,
    name: "City Hospital",
    type: "Healthcare",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    address: "123 Main St, Cityville",
    phone: "(555) 123-4567",
    email: "info@cityhospital.com",
    website: "www.cityhospital.com",
    hours: [
      { day: "Monday", hours: "8:00 AM - 6:00 PM" },
      { day: "Tuesday", hours: "8:00 AM - 6:00 PM" },
      { day: "Wednesday", hours: "8:00 AM - 6:00 PM" },
      { day: "Thursday", hours: "8:00 AM - 6:00 PM" },
      { day: "Friday", hours: "8:00 AM - 6:00 PM" },
      { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
      { day: "Sunday", hours: "Closed" }
    ],
    description: "City Hospital is a leading healthcare facility providing comprehensive medical services to the community. With state-of-the-art equipment and a team of experienced healthcare professionals, we are committed to delivering the highest quality care to our patients.",
    waitTime: 25,
    currentToken: "A-28",
    isOpen: true,
    services: [
      { id: "1", name: "General Consultation", waitTime: 25, price: "$50" },
      { id: "2", name: "Specialist Consultation", waitTime: 40, price: "$100" },
      { id: "3", name: "Laboratory Tests", waitTime: 15, price: "$75" },
      { id: "4", name: "X-ray & Imaging", waitTime: 30, price: "$120" },
      { id: "5", name: "Vaccination", waitTime: 10, price: "$35" }
    ]
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link to="/businesses" className="text-smartqueue-primary hover:underline flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Businesses
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative h-64 rounded-xl overflow-hidden mb-6">
              <img 
                src={business.image} 
                alt={business.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className={business.isOpen ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                  {business.isOpen ? "Open Now" : "Closed"}
                </Badge>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{business.name}</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm border-smartqueue-secondary text-smartqueue-secondary">
                    {business.type}
                  </Badge>
                  <div className="flex items-center text-yellow-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-gray-700">(4.7)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-4 sm:mt-0">
                <Link to={`/appointment/${id}`}>
                  <Button variant="outline" className="border-smartqueue-primary text-smartqueue-primary hover:bg-smartqueue-light">
                    Book Appointment
                  </Button>
                </Link>
                <Link to={`/token/${id}`}>
                  <Button className="bg-gradient-to-r from-smartqueue-primary to-smartqueue-secondary hover:opacity-90">
                    Get Token
                  </Button>
                </Link>
              </div>
            </div>
            
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="location">Location & Hours</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-6">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    {business.description}
                  </p>
                  
                  <div className="bg-smartqueue-light rounded-lg p-4 mt-4">
                    <h3 className="font-semibold mb-2">Current Queue Status</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Current Token</p>
                        <p className="text-xl font-bold gradient-text">{business.currentToken}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Est. Wait Time</p>
                        <p className="text-xl font-bold">{business.waitTime} min</p>
                      </div>
                      <div>
                        <Link to={`/token/${id}`}>
                          <Button size="sm" className="bg-gradient-to-r from-smartqueue-primary to-smartqueue-secondary hover:opacity-90">
                            Join Queue
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="services" className="mt-6">
                <div className="space-y-4">
                  {business.services.map(service => (
                    <Card key={service.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4 border-b flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{service.name}</h3>
                            <p className="text-gray-600 text-sm">Est. wait: {service.waitTime} min</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{service.price}</p>
                            <Link to={`/token/${id}?service=${service.id}`}>
                              <Button size="sm" className="mt-2 bg-gradient-to-r from-smartqueue-primary to-smartqueue-secondary hover:opacity-90">
                                Get Token
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Business Hours</h3>
                    <div className="space-y-2">
                      {business.hours.map((item, index) => (
                        <div key={index} className="flex justify-between py-1 border-b border-gray-100">
                          <span className="font-medium">{item.day}</span>
                          <span className="text-gray-700">{item.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-smartqueue-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-gray-700">{business.address}</p>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-smartqueue-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <p className="text-gray-700">{business.phone}</p>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-smartqueue-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-700">{business.email}</p>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-smartqueue-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <p className="text-gray-700">{business.website}</p>
                      </div>
                    </div>
                    
                    <div className="h-48 bg-gray-200 rounded-xl mt-4">
                      {/* Map placeholder */}
                      <div className="h-full flex items-center justify-center text-gray-500">
                        Map View
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Queue Information</h3>
                
                <div className="bg-smartqueue-light rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-gray-600 text-sm">Current Token</p>
                    <p className="text-xl font-bold gradient-text">{business.currentToken}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-gray-600 text-sm">Est. Wait Time</p>
                    <p className="text-xl font-bold">{business.waitTime} min</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600 text-sm">Status</p>
                    <Badge className={business.isOpen ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                      {business.isOpen ? "Open Now" : "Closed"}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Link to={`/token/${id}`} className="block w-full">
                    <Button className="w-full bg-gradient-to-r from-smartqueue-primary to-smartqueue-secondary hover:opacity-90">
                      Get Token Now
                    </Button>
                  </Link>
                  
                  <Link to={`/appointment/${id}`} className="block w-full">
                    <Button variant="outline" className="w-full border-smartqueue-primary text-smartqueue-primary hover:bg-smartqueue-light">
                      Book Appointment
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-3">Need Help?</h4>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-smartqueue-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={`tel:${business.phone}`} className="text-smartqueue-primary hover:underline">
                      Call {business.phone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BusinessDetail;
