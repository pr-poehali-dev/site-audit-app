import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { fetchLeads, type Lead } from "@/hooks/useLeads";

const ADMIN_PASS = "audit2024";

export default function AdminPage() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleLogin = () => {
    if (pass === ADMIN_PASS) {
      setAuthed(true);
    } else {
      setPassError("Неверный пароль");
    }
  };

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    fetchLeads()
      .then((data) => setLeads(data.leads || []))
      .catch(() => setError("Не удалось загрузить заявки"))
      .finally(() => setLoading(false));
  }, [authed]);

  const handleCopyAll = () => {
    const text = leads.map((l) => l.email).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const sourceLabel = (s: string) => s === "report" ? "Отчёт" : s === "pricing" ? "Тарифы" : s;
  const sourceBadge = (s: string) => s === "report"
    ? "bg-violet-400/15 text-violet-400"
    : "bg-blue-400/15 text-blue-400";

  if (!authed) {
    return (
      <div className="min-h-screen bg-background font-golos flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Lock" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-black text-foreground mb-1">Панель администратора</h1>
            <p className="text-muted-foreground text-sm">Введите пароль для доступа</p>
          </div>
          <div className="glass-strong rounded-2xl p-6">
            <input
              type="password"
              value={pass}
              onChange={(e) => { setPass(e.target.value); setPassError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Пароль"
              className={`w-full bg-muted rounded-xl px-4 py-3 text-foreground outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground mb-3 ${passError ? "ring-1 ring-red-400/60" : ""}`}
              autoFocus
            />
            {passError && (
              <p className="text-red-400 text-xs mb-3 flex items-center gap-1">
                <Icon name="AlertCircle" size={12} />
                {passError}
              </p>
            )}
            <button
              onClick={handleLogin}
              className="w-full gradient-bg text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Войти
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full mt-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← На главную
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-golos">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 gradient-bg rounded-xl flex items-center justify-center">
                <Icon name="BarChart2" size={18} className="text-white" />
              </div>
              <h1 className="text-2xl font-black text-foreground">Заявки на Pro</h1>
            </div>
            <p className="text-muted-foreground text-sm pl-12">
              {loading ? "Загружаем..." : `${leads.length} заявок всего`}
            </p>
          </div>
          <div className="flex gap-3">
            {leads.length > 0 && (
              <button
                onClick={handleCopyAll}
                className="flex items-center gap-2 glass px-4 py-2.5 rounded-xl text-sm text-foreground hover:bg-white/[0.08] transition-colors"
              >
                <Icon name={copied ? "Check" : "Copy"} size={14} className={copied ? "text-emerald-400" : "text-muted-foreground"} />
                {copied ? "Скопировано!" : "Копировать все email"}
              </button>
            )}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 glass px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="Home" size={14} />
              На сайт
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Всего заявок", value: leads.length, icon: "Users", color: "text-primary" },
            { label: "Из страницы Тарифы", value: leads.filter(l => l.source === "pricing").length, icon: "CreditCard", color: "text-blue-400" },
            { label: "Из страницы Отчёт", value: leads.filter(l => l.source === "report").length, icon: "FileText", color: "text-violet-400" },
            { label: "Сегодня", value: leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length, icon: "Calendar", color: "text-emerald-400" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <Icon name={stat.icon} size={18} className={stat.color} />
              </div>
              <div className={`text-3xl font-black ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="glass rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Icon name="Loader2" size={20} className="animate-spin text-primary" />
              Загружаем заявки...
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
              <Icon name="AlertCircle" size={32} className="text-red-400" />
              <p>{error}</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
              <Icon name="Inbox" size={40} className="opacity-30" />
              <p className="font-medium">Заявок пока нет</p>
              <p className="text-sm">Они появятся здесь, как только пользователи начнут оставлять email</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs text-muted-foreground font-medium px-5 py-4">#</th>
                    <th className="text-left text-xs text-muted-foreground font-medium px-5 py-4">Email</th>
                    <th className="text-left text-xs text-muted-foreground font-medium px-5 py-4">Источник</th>
                    <th className="text-left text-xs text-muted-foreground font-medium px-5 py-4">Сайт</th>
                    <th className="text-left text-xs text-muted-foreground font-medium px-5 py-4">Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, idx) => (
                    <tr key={lead.id} className="border-b border-border/50 last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4 text-sm text-muted-foreground">{idx + 1}</td>
                      <td className="px-5 py-4">
                        <span className="text-sm font-medium text-foreground">{lead.email}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${sourceBadge(lead.source)}`}>
                          {sourceLabel(lead.source)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs text-muted-foreground truncate max-w-[180px] block">
                          {lead.url || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(lead.created_at)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
