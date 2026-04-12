import { ReactNode } from "react";
import { Link } from "../router";

const NAV = [
  {
    label: "Stopwatch",
    to: "/demo",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "Progress",
    to: "/demo/progress",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "Dashboard",
    to: "/demo/dashboard",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

export default function DemoLayout({
  children,
  currentPath,
}: {
  children: ReactNode;
  currentPath: string;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Navbar */}
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          background: "rgba(232,228,220,0.92)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(26,26,26,0.08)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/leakr.jpeg" alt="Leakr" className="w-7 h-7 rounded-md object-contain" />
            <span className="text-sm font-semibold text-foreground tracking-tight">leakr</span>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded-full"
              style={{ background: "rgba(232,168,56,0.15)", color: "#92400E", border: "1px solid rgba(232,168,56,0.25)" }}
            >
              demo
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            {NAV.map((item) => {
              const active = currentPath === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200"
                  style={{
                    background: active ? "#1A1A1A" : "transparent",
                    color: active ? "#E8E4DC" : "rgba(26,26,26,0.55)",
                  }}
                >
                  {item.icon}
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Demo context banner */}
      <div className="w-full flex justify-center pt-5 pb-1 px-4">
        <div
          className="flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-light text-foreground"
          style={{
            background: "rgba(232,228,220,0.80)",
            border: "1px solid rgba(26,26,26,0.10)",
            boxShadow: "0 2px 12px rgba(26,26,26,0.06)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: "#4ADE80", boxShadow: "0 0 0 3px rgba(74,222,128,0.20)" }}
          />
          Free plan · timer is manual · data lives in your browser only
        </div>
      </div>

      {/* Page content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
