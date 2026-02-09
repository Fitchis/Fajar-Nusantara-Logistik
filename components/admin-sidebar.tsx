'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminAuth } from '@/providers/admin-auth-provider';
import {
  Menu,
  X,
  LayoutDashboard,
  MessageSquare,
  Images,
  Mail,
  Users,
  LogOut,
  ChevronRight,
} from 'lucide-react';

const sidebarItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Testimonials',
    href: '/admin/testimonials',
    icon: MessageSquare,
  },
  {
    label: 'Gallery',
    href: '/admin/gallery',
    icon: Images,
  },
  {
    label: 'Contact Submissions',
    href: '/admin/contacts',
    icon: Mail,
  },
  {
    label: 'Team & Clients',
    href: '/admin/team-clients',
    icon: Users,
  },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-slate-900 text-white transition-all duration-300 z-40 flex flex-col ${
          isOpen ? 'w-64' : 'w-20'
        } lg:relative lg:z-0`}
      >
        {/* Logo Section */}
        <div className={`p-6 border-b border-slate-800 transition-all ${!isOpen && 'flex justify-center'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            {isOpen && (
              <div>
                <h1 className="font-bold text-white text-sm">FNL Admin</h1>
                <p className="text-xs text-slate-400">Fajar Nusantara</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group relative ${
                  isActive
                    ? 'bg-brand text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen ? (
                  <span className="text-sm font-medium">{item.label}</span>
                ) : (
                  <div className="absolute left-20 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.label}
                    <ChevronRight className="absolute -left-1 top-1/2 -translate-y-1/2 w-4 h-4" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="border-t border-slate-800 p-4">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-900 hover:text-white transition-all ${
              !isOpen && 'justify-center'
            }`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`hidden lg:flex w-full items-center justify-center py-3 border-t border-slate-800 hover:bg-slate-800 transition ${
            !isOpen && 'justify-center'
          }`}
          aria-label="Toggle sidebar"
        >
          <ChevronRight
            className={`w-5 h-5 text-slate-400 transition-transform ${
              !isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </aside>

      {/* Main Content Offset */}
      <div
        className={`transition-all duration-300 flex-1 ${
          isOpen ? 'lg:ml-0' : 'lg:ml-0'
        }`}
      />
    </>
  );
}
