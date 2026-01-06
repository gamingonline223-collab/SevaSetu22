'use client';

import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const getTitle = () => {
    if (pathname.includes('/user')) return 'Citizen Dashboard';
    if (pathname.includes('/worker')) return 'Worker Dashboard';
    return 'Admin Dashboard';
  };

  const isAdminDashboard = !pathname.includes('/user') && !pathname.includes('/worker');

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200 h-[60px] md:h-[64px] flex items-center px-md md:px-lg">
      {/* Left: Menu/Logo */}
      <div className="flex items-center gap-md flex-1">
        <div className="text-2xl font-bold text-primary-700">
          ৎ
        </div>
        <div>
          <h1 className="text-base md:text-lg font-bold text-neutral-800">
            {getTitle()}
          </h1>
        </div>
      </div>

      {/* Center: Search (Only for Admin Dashboard) */}
      {isAdminDashboard && (
        <div className="hidden md:flex flex-1 justify-center px-md">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search issues, workers..."
              className="w-full px-md py-sm border border-neutral-300 rounded-md text-sm focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-100"
            />
            <span className="material-icons absolute right-md top-1/2 transform -translate-y-1/2 text-neutral-400">
              search
            </span>
          </div>
        </div>
      )}

      {/* Right: Icons & Profile */}
      <div className="flex items-center gap-md md:gap-lg">
        {/* Mobile Search Icon */}
        <button className="md:hidden text-neutral-600 hover:text-primary-700 transition-colors">
          <span className="material-icons">search</span>
        </button>

        {/* Notifications */}
        <button className="relative text-neutral-600 hover:text-primary-700 transition-colors">
          <span className="material-icons">notifications</span>
          <span className="absolute -top-1 -right-1 bg-danger text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            3
          </span>
        </button>

        {/* Profile Avatar */}
        <button className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-primary-700 text-white flex items-center justify-center font-bold hover:bg-primary-800 transition-colors">
          <span className="material-icons">account_circle</span>
        </button>
      </div>
    </nav>
  );
}
