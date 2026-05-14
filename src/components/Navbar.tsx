import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Аудит", path: "/audit" },
    { label: "Тарифы", path: "/pricing" },
    { label: "Контакты", path: "/contacts" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/40 transition-shadow">
              <Icon name="Zap" size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">SiteAudit</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.path}
                onClick={() => navigate(l.path)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  location.pathname === l.path
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/cabinet")}
              className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
            >
              Войти
            </button>
            <button
              onClick={() => navigate("/audit")}
              className="px-4 py-2 rounded-xl text-sm font-semibold gradient-bg text-white hover:opacity-90 transition-opacity shadow-lg"
            >
              Запустить аудит
            </button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} className="text-foreground" />
          </button>
        </div>

        {menuOpen && (
          <div className="mt-2 glass rounded-2xl p-4 flex flex-col gap-2 animate-fade-in md:hidden">
            {links.map((l) => (
              <button
                key={l.path}
                onClick={() => { navigate(l.path); setMenuOpen(false); }}
                className="text-left px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
              >
                {l.label}
              </button>
            ))}
            <hr className="border-border my-1" />
            <button
              onClick={() => { navigate("/cabinet"); setMenuOpen(false); }}
              className="text-left px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
            >
              Войти
            </button>
            <button
              onClick={() => { navigate("/audit"); setMenuOpen(false); }}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold gradient-bg text-white text-center"
            >
              Запустить аудит
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
