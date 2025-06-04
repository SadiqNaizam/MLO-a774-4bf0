import React from 'react';

interface ThemedSectionHeaderProps {
  title: string;
  subtitle?: string;
  // Example: 'bg-doraemon-gadget-yellow' - define in tailwind.config.ts
  themeColorClass?: string;
}

const ThemedSectionHeader: React.FC<ThemedSectionHeaderProps> = ({
  title,
  subtitle,
  themeColorClass = 'bg-blue-100 border-blue-500', // Default Doraemon-esque blue
}) => {
  console.log("Rendering ThemedSectionHeader with title:", title);
  return (
    <div className={`p-4 mb-6 rounded-lg border-l-4 ${themeColorClass}`}>
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
    </div>
  );
}
export default ThemedSectionHeader;