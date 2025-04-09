
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

const Appointment = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  // States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState('1');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  
  // Mock business data
  const business = {
    id: id,
    name: "City Hospital",
    services: [
      { id: "1", name: "General Consultation", duration: "30 min" },
      { id: "2", name: "Specialist Consultation", duration: "45 min" },
      { id: "3", name: "Laboratory Tests", duration: "20 min" },
      { id: "4", name: "X-ray & Imaging", duration: "30 min" },
      { id: "5", name: "Vaccination", duration: "15 min" }
    ]
  };
  
  // Mock available time slots
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "12:00 PM", "2:00 PM", 
    "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", 
    "4:30 PM", "5:00 PM"
  ];
  
  const bookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !selectedService || !selectedDate || !selectedTime) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Mock appointment booking - in a real app, this would call an API
    toast({
      title: "Appointment Booked",
      description: `Your appointment has been booked for ${format(selectedDate as Date, "MMMM d, yyyy")} at ${selectedTime}`,
    });
    
    // Set appointment booked to true
    setAppointmentBooked(true);
  };
  
  const bookAnotherAppointment = () => {
    setAppointmentBooked(false);
    setName('');
    setPhone('');
    setEmail('');
    setSelectedDate(undefined);
    setSelectedTime('');
    setNotes('');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {!appointmentBooked ? (
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
              <h1 className="text-3xl font-bold mb-2">Book an Appointment</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Schedule an appointment with {business.name} at your preferred date and time.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <form onSubmit={bookAppointment}>
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
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                              Duration: {service.duration}
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4">Appointment Date & Time</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Select Date <span className="text-red-500">*</span></Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className="w-full justify-start text-left font-normal"
                              >
                                {selectedDate ? format(selectedDate, "PPP") : <span className="text-gray-400">Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                initialFocus
                                disabled={(date) => {
                                  // Disable past dates and weekends
                                  const today = new Date();
                                  today.setHours(0, 0, 0, 0);
                                  const day = date.getDay();
                                  return date < today || day === 0; // Sunday is disabled
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Select Time <span className="text-red-500">*</span></Label>
                          <Select 
                            value={selectedTime} 
                            onValueChange={setSelectedTime}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((time, index) => (
                                <SelectItem key={index} value={time}>{time}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Input
                          id="notes"
                          placeholder="Any special requirements or information for the provider"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-smartqueue-primary to-smartqueue-secondary hover:opacity-90"
                    >
                      Book Appointment
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Appointment Confirmed!</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Your appointment has been successfully scheduled.
              </p>
            </div>
            
            <div className="token-card">
              <div className="text-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-2xl font-semibold mb-1">{business.name}</h2>
                <p className="text-gray-600 text-sm">
                  {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : ""} • {selectedTime}
                </p>
              </div>
              
              <div className="bg-smartqueue-light rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Appointment For</p>
                    <p className="font-semibold">{name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Service</p>
                    <p className="font-semibold">
                      {business.services.find(s => s.id === selectedService)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Contact Number</p>
                    <p className="font-semibold">{phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Duration</p>
                    <p className="font-semibold">
                      {business.services.find(s => s.id === selectedService)?.duration}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4 text-sm text-gray-600">
                <p>
                  A confirmation has been sent to your phone. Please arrive 10 minutes before your scheduled appointment time.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  className="border-smartqueue-primary text-smartqueue-primary hover:bg-smartqueue-light"
                  onClick={bookAnotherAppointment}
                >
                  Book Another Appointment
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

export default Appointment;
