import React from 'react';
import { Home, Search, Library, PlusSquare, ListMusic } from 'lucide-react'; // Example icons
import { Button } from '@/components/ui/button'; // Using shadcn Button for consistency
// You might import and use shadcn/ui NavigationMenu here if desired

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon, label }) => {
  // In a real app, you'd use Link from react-router-dom
  // For now, simple anchor tags
  return (
    <a href={href} className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
      {icon}
      <span>{label}</span>
    </a>
  );
};

const Sidebar: React.FC = () => {
  console.log("Rendering Sidebar");

  // Doraemon theme colors (placeholders)
  const doraemonPrimaryBg = 'bg-blue-600'; // Example: Doraemon's body blue
  const doraemonPrimaryText = 'text-white';

  return (
    <aside className="w-60 h-screen bg-gray-50 border-r border-gray-200 p-4 flex flex-col space-y-6 fixed top-0 left-0">
      {/* Logo/App Name Placeholder */}
      <div className={`p-4 rounded-lg ${doraemonPrimaryBg} ${doraemonPrimaryText} text-center`}>
        <h1 className="text-xl font-bold">DoraPlay</h1> {/* Themed App Name */}
      </div>

      <nav className="flex-grow space-y-1">
        <SidebarLink href="/home" icon={<Home size={20} />} label="Home" />
        <SidebarLink href="/search" icon={<Search size={20} />} label="Search" />
        <SidebarLink href="/library" icon={<Library size={20} />} label="Your Library" />
      </nav>

      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
            <PlusSquare size={20} className="mr-3" /> Create Playlist
        </Button>
        <Button variant="ghost" className="w-full justify-start">
            <ListMusic size={20} className="mr-3" /> Liked Songs
        </Button>
      </div>
      {/* Optional: User profile section */}
    </aside>
  );
}
export default Sidebar;