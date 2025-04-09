
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Mock login - in a real app, this would call an authentication API
    toast({
      title: "Login Successful",
      description: "You have been logged in successfully."
    });
    
    // Reset form
    setEmail('');
    setPassword('');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-600">
              Sign in to your SmartQueue account to manage your tokens and appointments.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-smartqueue-primary hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={remember} 
                    onCheckedChange={(checked) => setRemember(checked as boolean)} 
                  />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">Remember me</Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-smartqueue-primary to-smartqueue-secondary hover:opacity-90"
                >
                  Sign In
                </Button>
              </div>
            </form>
            
            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-gray-600 text-sm">Don't have an account?</p>
              <Link to="/register" className="text-smartqueue-primary hover:underline font-medium">
                Sign Up
              </Link>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              By signing in, you agree to our{" "}
              <Link to="/terms" className="text-smartqueue-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-smartqueue-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
