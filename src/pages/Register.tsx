
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const { toast } = useToast();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone || !password || !confirmPassword) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    if (!terms) {
      toast({
        title: "Terms Not Accepted",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }
    
    // Mock registration - in a real app, this would call an API
    toast({
      title: "Registration Successful",
      description: "Your account has been created successfully."
    });
    
    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    setTerms(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
            <p className="text-gray-600">
              Join SmartQueue to skip the lines and manage your appointments.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8">
            <form onSubmit={handleRegister}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={terms} 
                    onCheckedChange={(checked) => setTerms(checked as boolean)} 
                  />
                  <Label htmlFor="terms" className="text-sm cursor-pointer">
                    I agree to the{" "}
                    <Link to="/terms" className="text-smartqueue-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-smartqueue-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-smartqueue-primary to-smartqueue-secondary hover:opacity-90"
                >
                  Create Account
                </Button>
              </div>
            </form>
            
            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-gray-600 text-sm">Already have an account?</p>
              <Link to="/login" className="text-smartqueue-primary hover:underline font-medium">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
