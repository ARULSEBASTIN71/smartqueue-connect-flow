
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  to: string;
  color: string;
}

const CategoryCard = ({ title, icon, count, to, color }: CategoryCardProps) => {
  return (
    <Link to={to} className="block">
      <div className={`rounded-xl p-6 transition-all hover:shadow-md flex flex-col items-center ${color}`}>
        <div className="mb-4 text-3xl">
          {icon}
        </div>
        <h3 className="font-semibold text-center">{title}</h3>
        <p className="text-sm text-gray-600 mt-1 text-center">{count} businesses</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
