import { Coffee, Plus, Settings } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  [
    "rounded-full px-4 py-2 text-sm font-medium transition",
    isActive
      ? "bg-stone-900 text-white shadow-lg shadow-stone-900/10"
      : "text-stone-600 hover:bg-white/80 hover:text-stone-900",
  ].join(" ");

function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(242,238,233,0.92)_38%,_rgba(230,224,217,0.8)_100%)] text-stone-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-20 mb-8 rounded-[2rem] border border-white/60 bg-white/75 px-5 py-4 shadow-[0_20px_60px_rgba(28,25,23,0.08)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Link className="flex items-center gap-3" to="/">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-900 text-white">
                <Coffee size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
                  Coffee Catalog
                </p>
                <h1 className="text-lg font-semibold tracking-tight">
                  Designed for slow rituals
                </h1>
              </div>
            </Link>

            <nav className="flex flex-wrap gap-2">
              <NavLink className={navLinkClass} to="/">
                Catalog
              </NavLink>
              <NavLink className={navLinkClass} to="/admin/coffees">
                <span className="inline-flex items-center gap-2">
                  <Settings size={16} />
                  Manage
                </span>
              </NavLink>
              <NavLink className={navLinkClass} to="/admin/coffees/new">
                <span className="inline-flex items-center gap-2">
                  <Plus size={16} />
                  New Coffee
                </span>
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;

