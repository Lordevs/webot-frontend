import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav-items";
import { ROUTES } from "@/constants/routes";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={ROUTES.APP.HOME} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-primary-foreground font-bold italic">W</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Webot</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-full transition-all">
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link href={ROUTES.AUTH.LOGIN}>
            <Button className="text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
