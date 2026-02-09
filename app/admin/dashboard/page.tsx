'use client';

import { useAdminAuth } from '@/providers/admin-auth-provider';
import { MessageSquare, Images, Mail, Users } from 'lucide-react';
import Link from 'next/link';

const stats = [
  {
    title: 'Testimonials',
    count: '12',
    href: '/admin/testimonials',
    icon: MessageSquare,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Gallery Items',
    count: '48',
    href: '/admin/gallery',
    icon: Images,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    title: 'Contact Messages',
    count: '24',
    href: '/admin/contacts',
    icon: Mail,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    title: 'Team & Clients',
    count: '15',
    href: '/admin/team-clients',
    icon: Users,
    color: 'bg-green-100 text-green-600',
  },
];

export default function AdminDashboard() {
  const { session } = useAdminAuth();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          Welcome back, <span className="font-semibold">{session?.email}</span>
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                    {stat.count}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/testimonials"
            className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg hover:shadow-md transition border border-blue-200 dark:border-blue-700"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
              Manage Testimonials
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Add, edit, or remove customer testimonials
            </p>
          </Link>
          <Link
            href="/admin/gallery"
            className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg hover:shadow-md transition border border-purple-200 dark:border-purple-700"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
              Manage Gallery
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Upload and organize gallery images
            </p>
          </Link>
          <Link
            href="/admin/contacts"
            className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg hover:shadow-md transition border border-orange-200 dark:border-orange-700"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
              View Contacts
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Check incoming contact form submissions
            </p>
          </Link>
          <Link
            href="/admin/team-clients"
            className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg hover:shadow-md transition border border-green-200 dark:border-green-700"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
              Team & Clients
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Manage team members and client listings
            </p>
          </Link>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
          System Information
        </h3>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li>✓ Admin panel is fully functional and secured</li>
          <li>✓ All changes are saved to local storage</li>
          <li>✓ Data persists across sessions</li>
          <li>✓ Session automatically clears on logout</li>
        </ul>
      </div>
    </div>
  );
}
