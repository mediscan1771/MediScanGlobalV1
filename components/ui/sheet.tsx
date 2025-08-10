import React from 'react';

export function Sheet({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SheetTrigger({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild?: boolean; // accepted for compatibility, not used
}) {
  return <>{children}</>;
}

export function SheetContent({
  children,
  side = 'right',
  className = '',
}: {
  children: React.ReactNode;
  side?: 'right' | 'left';
  className?: string;
}) {
  return (
    <div
      className={`fixed top-0 ${side === 'right' ? 'right-0' : 'left-0'} h-full w-full sm:w-[560px] bg-white border-l shadow-2xl p-4 overflow-auto ${className}`}
    >
      {children}
    </div>
  );
}

export function SheetHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-2">{children}</div>;
}

export function SheetTitle({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`text-lg font-semibold ${className}`}>{children}</div>;
}

export function SheetDescription({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-slate-600">{children}</div>;
}
