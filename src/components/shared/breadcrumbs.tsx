'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

function slugToTitle(slug: string) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function Breadcrumbs() {
  const pathname = usePathname();
  
  if (pathname === '/') {
    return null;
  }
  
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        <li>
          <div className="flex items-center">
            <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1.5">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </div>
        </li>
        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={href}>
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 shrink-0" />
                <Link
                  href={href}
                  className={cn(
                    'ml-2 hover:text-foreground transition-colors',
                    isLast && 'font-medium text-foreground pointer-events-none'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {slugToTitle(segment)}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
