
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BusinessCardProps {
  id: string;
  name: string;
  type: string;
  image: string;
  address: string;
  waitTime: number;
  isOpen: boolean;
}

const BusinessCard = ({ id, name, type, image, address, waitTime, isOpen }: BusinessCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div 
        className="h-40 bg-cover bg-center" 
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="p-2">
          <Badge className={isOpen ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
            {isOpen ? "Open Now" : "Closed"}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <Badge variant="outline" className="text-xs border-smartqueue-secondary text-smartqueue-secondary">
            {type}
          </Badge>
        </div>
        <p className="text-gray-600 text-sm mb-3">{address}</p>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">
            {waitTime === 0 ? "No wait time" : `Est. wait: ${waitTime} mins`}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link to={`/businesses/${id}`} className="flex-1">
          <Button variant="outline" className="w-full text-smartqueue-primary border-smartqueue-primary hover:bg-smartqueue-light">
            Details
          </Button>
        </Link>
        <Link to={`/token/${id}`} className="flex-1">
          <Button className="w-full bg-gradient-to-r from-smartqueue-primary to-smartqueue-secondary hover:opacity-90">
            Get Token
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BusinessCard;
