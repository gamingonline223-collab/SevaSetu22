'use client';

import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: 'Home', icon: 'home', href: '#', active: true },
    { label: 'Issues', icon: 'description', href: '#', badge: '23' },
    { label: 'Analytics', icon: 'analytics', href: '#' },
    { label: 'Workers', icon: 'people', href: '#' },
    { label: 'Settings', icon: 'settings', href: '#' },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed bottom-20 right-4 z-40 w-14 h-14 bg-primary-700 text-white rounded-full flex items-center justify-center shadow-floating hover:bg-primary-800 transition-colors"
      >
        <span className="material-icons">{isOpen ? 'close' : 'menu'}</span>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 top-[60px]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static top-[60px] left-0 bottom-0 z-30
        w-64 md:w-56 bg-white border-r border-neutral-200
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:translate-x-0 overflow-y-auto
      `}>
        <nav className="p-md">
          <ul className="space-y-sm">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  className={`
                    block px-md py-sm rounded-md transition-colors text-base
                    ${item.active
                      ? 'bg-primary-100 text-primary-700 font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                    }
                  `}
                >
                  <span className="flex items-center justify-between gap-md">
                    <span className="flex items-center gap-md flex-1">
                      <span className="material-icons text-lg">{item.icon}</span>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="bg-danger text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-md border-t border-neutral-200 mt-lg">
          <button className="w-full px-md py-sm bg-danger text-white rounded-md hover:bg-red-600 transition-colors text-sm font-semibold flex items-center justify-center gap-md">
            <span className="material-icons text-lg">logout</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
