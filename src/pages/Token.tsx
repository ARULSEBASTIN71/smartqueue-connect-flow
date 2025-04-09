
import React, { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import TokenDisplay from '../components/TokenDisplay';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Token = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('service');
  const { toast } = useToast();
  
  // States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(serviceId || '1');
  const [tokenGenerated, setTokenGenerated] = useState(false);
  const [tokenDetails, setTokenDetails] = useState({
    tokenNumber: '',
    businessName: '',
    date: '',
    time: '',
    estimatedTime: 0,
    currentToken: ''
  });
  
  // Mock business data
  const business = {
    id: id,
    name: "City Hospital",
    services: [
      { id: "1", name: "General Consultation", waitTime: 25 },
      { id: "2", name: "Specialist Consultation", waitTime: 40 },
      { id: "3", name: "Laboratory Tests", waitTime: 15 },
      { id: "4", name: "X-ray & Imaging", waitTime: 30 },
      { id: "5", name: "Vaccination", waitTime: 10 }
    ],
    currentToken: "A-28"
  };
  
  const generateToken = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Get the selected service
    const service = business.services.find(s => s.id === selectedService);
    
    // Mock token generation logic
    const tokenNumber = `A-${Math.floor(30 + Math.random() * 20)}`; // Random token between A-30 and A-50
    const now = new Date();
    const date = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    // Set token details
    setTokenDetails({
      tokenNumber,
      businessName: business.name,
      date,
      time,
      estimatedTime: service ? service.waitTime : 0,
      currentToken: business.currentToken
    });
    
    // Show success message
    toast({
      title: "Token Generated Successfully",
      description: `Your token number is ${tokenNumber}`,
    });
    
    // Set token generated to true
    setTokenGenerated(true);
  };
  
  const getNewToken = () => {
    setTokenGenerated(false);
    setName('');
    setPhone('');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {!tokenGenerated ? (
          <>
            <div className="mb-8">
              <Link to={`/businesses/${id}`} className="text-smartqueue-primary hover:underline flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Business
              </Link>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Get Your Token</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Fill in your details below to generate a token for {business.name}.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <form onSubmit={generateToken}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                          <Input
                            id="phone"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4">Select Service</h3>
                      <RadioGroup 
                        value={selectedService} 
                        onValueChange={setSelectedService}
                        className="space-y-3"
                      >
                        {business.services.map(service => (
                          <div key={service.id} className="flex items-center justify-between border rounded-lg p-4">
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value={service.id} id={`service-${service.id}`} />
                              <Label htmlFor={`service-${service.id}`} className="cursor-pointer">
                                {service.name}
                              </Label>
                            </div>
                            <div className="text-sm text-gray-600">
                              Est. wait: {service.waitTime} min
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    <div className="border-t pt-6">
                      <div className="bg-smartqueue-light rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600 text-sm">Current Token</p>
                            <p className="text-lg font-semibold">{business.currentToken}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Est. Wait Time</p>
                            <p className="text-lg font-semibold">
                              {business.services.find(s => s.id === selectedService)?.waitTime || 0} min
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-smartqueue-primary to-smartqueue-secondary hover:opacity-90"
                      >
                        Generate Token
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Your Token is Ready!</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Keep this token handy. You will be notified when it's your turn.
              </p>
            </div>
            
            <TokenDisplay
              tokenNumber={tokenDetails.tokenNumber}
              businessName={tokenDetails.businessName}
              date={tokenDetails.date}
              time={tokenDetails.time}
              estimatedTime={tokenDetails.estimatedTime}
              currentToken={tokenDetails.currentToken}
            />
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-4">
                You will receive updates about your token status. Please arrive before your turn.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  className="border-smartqueue-primary text-smartqueue-primary hover:bg-smartqueue-light"
                  onClick={getNewToken}
                >
                  Get Another Token
                </Button>
                
                <Link to={`/businesses/${id}`}>
                  <Button className="bg-gradient-to-r from-smartqueue-primary to-smartqueue-secondary hover:opacity-90">
                    Back to Business
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Token;
