
import React from 'react';

const BathIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 12V3a1 1 0 00-1-1H9a1 1 0 00-1 1v9m7 0a2 2 0 11-4 0m4 0H8m11 0a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2a2 2 0 012-2h2z"
    />
  </svg>
);

export default BathIcon;
