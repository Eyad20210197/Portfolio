'use client';

import Link from 'next/link';
import {
  Book,
  Code,
  FolderKanban,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Settings,
} from 'lucide-react';
import { logout } from '@/lib/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-white/10">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem href="/admin" icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <NavItem href="/admin/projects" icon={<FolderKanban size={18} />} label="Projects" />
          <NavItem href="/admin/blog" icon={<Book size={18} />} label="Blog" />
          <NavItem href="/admin/skills" icon={<Lightbulb size={18} />} label="Skills" />
          <NavItem href="/admin/technologies" icon={<Code size={18} />} label="Technologies" />
          <NavItem href="/admin/site-config" icon={<Settings size={18} />} label="Site Config" />
        </nav>

        <button
          onClick={logout}
          className="m-4 flex items-center gap-2 rounded-md p-2 hover:bg-white/10"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-white border-b border-gray-200 px-6 flex items-center">
          <h1 className="font-semibold">Admin Dashboard</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-white/10"
    >
      {icon}
      {label}
    </Link>
  );
}
