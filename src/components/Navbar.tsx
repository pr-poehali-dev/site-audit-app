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
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div
          className="px-5 py-3 flex items-center justify-between rounded-2xl"
          style={{
            background: "rgba(15,15,18,0.75)",
            backdropFilter: "blur(24px) saturate(150%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center"
              style={{ boxShadow: "0 4px 16px rgba(99,102,241,0.4)" }}>
              <Icon name="Zap" size={15} className="text-white" />
            </div>
            <span className="font-bold text-[17px] text-foreground tracking-tight">SiteAudit</span>
          </button>

          {/* Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {links.map((l) => (
              <button
                key={l.path}
                onClick={() => navigate(l.path)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                  location.pathname === l.path
                    ? "bg-white/8 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => navigate("/cabinet")}
              className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-150"
            >
              Войти
            </button>
            <button
              onClick={() => navigate("/audit")}
              className="px-4 py-2 rounded-xl text-sm font-semibold gradient-bg text-white hover:opacity-90 transition-opacity"
              style={{ boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }}
            >
              Запустить аудит
            </button>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={19} className="text-foreground" />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mt-2 rounded-2xl p-3 flex flex-col gap-1 animate-fade-in md:hidden"
            style={{
              background: "rgba(15,15,18,0.95)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
            {links.map((l) => (
              <button
                key={l.path}
                onClick={() => { navigate(l.path); setMenuOpen(false); }}
                className="text-left px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
              >
                {l.label}
              </button>
            ))}
            <div className="h-px bg-border mx-2 my-1" />
            <button
              onClick={() => { navigate("/cabinet"); setMenuOpen(false); }}
              className="text-left px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
            >
              Войти
            </button>
            <button
              onClick={() => { navigate("/audit"); setMenuOpen(false); }}
              className="px-4 py-3 rounded-xl text-sm font-semibold gradient-bg text-white text-center"
            >
              Запустить аудит
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
