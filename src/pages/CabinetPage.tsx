import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";

type View = "login" | "register" | "cabinet";

const mockAudits = [
  { id: 1, url: "myshop.ru", score: 58, date: "14 мая 2024", status: "warn" },
  { id: 2, url: "myshop.ru", score: 45, date: "2 мая 2024", status: "error" },
  { id: 3, url: "landing.myshop.ru", score: 72, date: "28 апр 2024", status: "ok" },
];

export default function CabinetPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const scoreColor = (s: number) =>
    s >= 80 ? "text-emerald-400" : s >= 60 ? "text-yellow-400" : "text-red-400";

  const scoreRing = (s: number) =>
    s >= 80 ? "#34d399" : s >= 60 ? "#fbbf24" : "#f87171";

  if (view === "cabinet") {
    return (
      <div className="min-h-screen bg-background font-golos">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 pt-28 pb-16">
          {/* Profile header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center text-2xl font-black text-white">
                {name ? name[0].toUpperCase() : "U"}
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">{name || "Пользователь"}</div>
                <div className="text-muted-foreground text-sm">{email || "user@example.ru"}</div>
                <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">
                  <Icon name="Zap" size={10} className="text-primary" />
                  Free тариф · 1 из 3 аудитов использовано
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/pricing")}
                className="gradient-bg text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity"
              >
                Перейти на Pro
              </button>
              <button
                onClick={() => setView("login")}
                className="glass px-5 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Audit history */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">История аудитов</h2>
                <button
                  onClick={() => navigate("/audit")}
                  className="text-primary text-sm font-medium hover:text-primary/80 flex items-center gap-1 transition-colors"
                >
                  <Icon name="Plus" size={14} />
                  Новый аудит
                </button>
              </div>
              <div className="space-y-3">
                {mockAudits.map((audit) => (
                  <button
                    key={audit.id}
                    onClick={() => navigate(`/report?url=${encodeURIComponent(audit.url)}`)}
                    className="w-full glass rounded-2xl p-5 flex items-center gap-4 hover:bg-white/[0.05] transition-all text-left group"
                  >
                    <div className="relative w-14 h-14 flex-shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3.5" />
                        <circle
                          cx="20" cy="20" r="16" fill="none"
                          stroke={scoreRing(audit.score)}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 16}
                          strokeDashoffset={2 * Math.PI * 16 * (1 - audit.score / 100)}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-sm font-black ${scoreColor(audit.score)}`}>{audit.score}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {audit.url}
                      </div>
                      <div className="text-sm text-muted-foreground">{audit.date}</div>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-muted-foreground flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Plan */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-bold text-foreground mb-4">Ваш тариф</h3>
                <div className="text-2xl font-black text-foreground mb-1">Free</div>
                <div className="text-sm text-muted-foreground mb-4">3 аудита в месяц</div>
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>Использовано</span>
                    <span>1 из 3</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-bg rounded-full" style={{ width: "33%" }} />
                  </div>
                </div>
                <button
                  onClick={() => navigate("/pricing")}
                  className="w-full gradient-bg text-white font-semibold py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity"
                >
                  Обновить до Pro
                </button>
              </div>

              {/* Settings */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-bold text-foreground mb-4">Настройки</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Имя</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-muted rounded-xl px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary/50"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-muted rounded-xl px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary/50"
                      placeholder="email@example.ru"
                    />
                  </div>
                  <button className="w-full py-2.5 rounded-xl border border-border text-sm text-foreground hover:bg-white/5 transition-colors font-medium">
                    Сохранить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-golos">
      <Navbar />

      <div className="flex items-center justify-center min-h-screen px-4 pt-20">
        <div className="w-full max-w-md animate-scale-in">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 glow-indigo">
              <Icon name="User" size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-foreground mb-2">
              {view === "login" ? "Добро пожаловать" : "Создайте аккаунт"}
            </h1>
            <p className="text-muted-foreground">
              {view === "login"
                ? "Войдите, чтобы видеть историю аудитов"
                : "Бесплатно. 3 аудита каждый месяц"}
            </p>
          </div>

          <div className="glass-strong rounded-2xl p-6">
            {view === "register" && (
              <div className="mb-4">
                <label className="text-xs text-muted-foreground mb-1.5 block">Имя</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-muted rounded-xl px-4 py-3 text-foreground outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground"
                  placeholder="Ваше имя"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-muted rounded-xl px-4 py-3 text-foreground outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground"
                placeholder="email@example.ru"
              />
            </div>
            <div className="mb-6">
              <label className="text-xs text-muted-foreground mb-1.5 block">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-muted rounded-xl px-4 py-3 text-foreground outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground"
                placeholder="••••••••"
              />
            </div>
            <button
              onClick={() => setView("cabinet")}
              className="w-full gradient-bg text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
            >
              {view === "login" ? "Войти" : "Зарегистрироваться"}
            </button>

            <div className="mt-4 text-center">
              {view === "login" ? (
                <p className="text-sm text-muted-foreground">
                  Нет аккаунта?{" "}
                  <button onClick={() => setView("register")} className="text-primary hover:underline font-medium">
                    Зарегистрироваться
                  </button>
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Уже есть аккаунт?{" "}
                  <button onClick={() => setView("login")} className="text-primary hover:underline font-medium">
                    Войти
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
