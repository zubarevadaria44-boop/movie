import Link from "next/link";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/movies", label: "Movies" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/comments", label: "Comments" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 bg-[#1B1E2A] border-r border-[#2A2E3E] p-4">
        <h2 className="font-display text-2xl text-[#E8A33D] mb-6 px-2">Admin Panel</h2>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2 py-2 rounded-sm text-sm hover:bg-[#12141C] hover:text-[#E8A33D] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}