
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TokenDisplayProps {
  tokenNumber: string;
  businessName: string;
  date: string;
  time: string;
  estimatedTime: number;
  currentToken: string;
}

const TokenDisplay = ({ 
  tokenNumber, 
  businessName, 
  date, 
  time, 
  estimatedTime, 
  currentToken 
}: TokenDisplayProps) => {
  
  const isCurrentToken = tokenNumber === currentToken;

  return (
    <div className="token-card max-w-md mx-auto">
      <div className="text-center mb-4">
        <Badge variant={isCurrentToken ? "default" : "outline"} className={isCurrentToken ? "bg-green-500 hover:bg-green-600" : ""}>
          {isCurrentToken ? "It's Your Turn!" : "In Queue"}
        </Badge>
      </div>
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-1">{businessName}</h2>
        <p className="text-gray-600 text-sm">{date} • {time}</p>
      </div>
      
      <div className="bg-smartqueue-light rounded-lg p-6 mb-6 text-center">
        <p className="text-sm text-smartqueue-secondary font-medium mb-2">Your Token Number</p>
        <h1 className="text-5xl font-bold mb-2 gradient-text">{tokenNumber}</h1>
        <p className="text-gray-600 text-sm">
          {isCurrentToken 
            ? "Please proceed to the counter" 
            : `Current token: ${currentToken}`
          }
        </p>
      </div>
      
      <div className="flex justify-between items-center text-sm">
        <div className="text-center">
          <p className="text-gray-600">People Ahead</p>
          <p className="font-semibold text-lg">
            {isCurrentToken ? 0 : parseInt(tokenNumber) - parseInt(currentToken)}
          </p>
        </div>
        
        <div className="h-10 w-px bg-gray-200"></div>
        
        <div className="text-center">
          <p className="text-gray-600">Est. Wait Time</p>
          <p className="font-semibold text-lg">
            {isCurrentToken ? "Now" : `${estimatedTime} min`}
          </p>
        </div>
        
        <div className="h-10 w-px bg-gray-200"></div>
        
        <div className="text-center">
          <p className="text-gray-600">Token Status</p>
          <p className={`font-semibold text-lg ${isCurrentToken ? "text-green-500" : "text-yellow-500"}`}>
            {isCurrentToken ? "Active" : "Waiting"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenDisplay;
