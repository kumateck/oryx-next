import React from "react";
import type { LucideProps } from "lucide-react";

interface InfoCardProps {
  icon: React.ElementType<LucideProps>;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon: Icon,
  title,
  children,
  className = "",
}) => (
  <div
    className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm ${className}`}
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon className="h-5 w-5 text-blue-600" />
      </div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
    </div>
    {children}
  </div>
);

export default InfoCard;
