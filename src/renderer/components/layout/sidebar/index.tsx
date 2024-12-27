import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet';
import { ScrollArea } from '../../ui/scroll-area';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';
import { Menu, Home, Settings, LayoutDashboard, Users, FileText, Bell, Upload } from 'lucide-react';
import { cn } from '../../../lib/utils';
import './styles.css';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: '主要功能',
    items: [
      {
        title: '首页',
        href: '/',
        icon: Home,
      },
      {
        title: '仪表盘',
        href: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: '用户管理',
        href: '/users',
        icon: Users,
      },
    ],
  },
  {
    title: '系统功能',
    items: [
      {
        title: '上传文档',
        href: '/upload',
        icon: Upload,
      },
      {
        title: '通知中心',
        href: '/notifications',
        icon: Bell,
      },
      {
        title: '文档中心',
        href: '/docs',
        icon: FileText,
      },
      {
        title: '系统设置',
        href: '/settings',
        icon: Settings,
      },
    ],
  },
];

const SidebarNav = ({ section }: { section: NavSection }) => {
  const location = useLocation();
  
  return (
    <div className="sidebar-section">
      <h3 className="sidebar-section-title">
        {section.title}
      </h3>
      <nav className="space-y-1">
        {section.items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'sidebar-nav-link',
              location.pathname === item.href && 'active'
            )}
          >
            <item.icon className="icon" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

const Sidebar = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-4 z-40 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <div className="sidebar-header">
            <h2 className="text-lg font-semibold">试热重载</h2>
          </div>
          <ScrollArea className="sidebar-content">
            <div className="space-y-4">
              {navSections.map((section, index) => (
                <React.Fragment key={section.title}>
                  <SidebarNav section={section} />
                  {index < navSections.length - 1 && (
                    <Separator className="mx-4" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <div className="sidebar-container">
        <div className="sidebar-header">
          <h2 className="text-lg font-semibold">测试热重载</h2>
        </div>
        <ScrollArea className="sidebar-content">
          <div className="space-y-4">
            {navSections.map((section, index) => (
              <React.Fragment key={section.title}>
                <SidebarNav section={section} />
                {index < navSections.length - 1 && (
                  <Separator className="mx-4" />
                )}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default Sidebar; 