import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";

type Status = "ok" | "warn" | "error";

interface CheckPoint {
  id: number;
  title: string;
  status: Status;
  score: number;
  priority: "high" | "medium" | "low";
  description: string;
  fix: string;
  complexity: "легко" | "средне" | "сложно";
  time: string;
  isPro?: boolean;
}

const generateReport = (url: string): CheckPoint[] => [
  {
    id: 1,
    title: "Доступность сайта",
    status: "ok",
    score: 100,
    priority: "high",
    description: "Сайт доступен и отвечает на запросы",
    fix: "Сайт работает корректно. Рекомендуем настроить мониторинг доступности.",
    complexity: "легко",
    time: "5 мин",
  },
  {
    id: 2,
    title: "Скорость загрузки",
    status: "warn",
    score: 62,
    priority: "high",
    description: "Время загрузки: 3.2с. Норма — до 2с для мобильных",
    fix: "Оптимизируйте изображения (WebP), включите gzip-сжатие, настройте кэширование браузера.",
    complexity: "средне",
    time: "2-4 часа",
    isPro: false,
  },
  {
    id: 3,
    title: "Мобильная адаптивность",
    status: "ok",
    score: 88,
    priority: "medium",
    description: "Сайт адаптирован для мобильных устройств",
    fix: "Хорошие показатели. Проверьте шрифты на экранах менее 320px.",
    complexity: "легко",
    time: "30 мин",
  },
  {
    id: 4,
    title: "HTTPS-сертификат",
    status: "ok",
    score: 100,
    priority: "high",
    description: "SSL-сертификат установлен и действителен",
    fix: "Сертификат в порядке. Убедитесь в автоматическом обновлении.",
    complexity: "легко",
    time: "10 мин",
  },
  {
    id: 5,
    title: "Meta title и description",
    status: "error",
    score: 0,
    priority: "high",
    description: "Meta description отсутствует. Title слишком длинный (78 символов)",
    fix: 'Добавьте <meta name="description" content="..."> в <head>. Длина title: 50-60 символов, description: 150-160 символов.',
    complexity: "легко",
    time: "15 мин",
  },
  {
    id: 6,
    title: "Заголовок H1",
    status: "warn",
    score: 50,
    priority: "medium",
    description: "Найдено 3 заголовка H1. На странице должен быть только один",
    fix: "Оставьте один H1 с главным ключевым словом. Остальные замените на H2 или H3.",
    complexity: "легко",
    time: "20 мин",
  },
  {
    id: 7,
    title: "Alt у изображений",
    status: "error",
    score: 20,
    priority: "medium",
    description: "8 из 10 изображений не имеют атрибута alt",
    fix: 'Добавьте alt="описание" к каждому изображению. Это влияет на SEO и доступность.',
    complexity: "легко",
    time: "30 мин",
    isPro: true,
  },
  {
    id: 8,
    title: "Robots.txt и Sitemap",
    status: "warn",
    score: 50,
    priority: "medium",
    description: "robots.txt найден. Sitemap.xml отсутствует",
    fix: "Создайте sitemap.xml и добавьте ссылку в robots.txt. Отправьте sitemap в Google Search Console.",
    complexity: "средне",
    time: "1 час",
    isPro: true,
  },
  {
    id: 9,
    title: "Битые ссылки",
    status: "error",
    score: 0,
    priority: "high",
    description: "Обнаружено 4 битые ссылки (404)",
    fix: "Исправьте или удалите ссылки возвращающие 404. Настройте 301-редиректы для старых URL.",
    complexity: "средне",
    time: "1-2 часа",
    isPro: true,
  },
  {
    id: 10,
    title: "Безопасность",
    status: "warn",
    score: 70,
    priority: "high",
    description: "Отсутствуют заголовки безопасности: CSP, X-Frame-Options",
    fix: "Добавьте HTTP-заголовки: Content-Security-Policy, X-Frame-Options: DENY, X-Content-Type-Options: nosniff",
    complexity: "сложно",
    time: "2-4 часа",
    isPro: true,
  },
];

const statusConfig = {
  ok: { icon: "CheckCircle", color: "text-emerald-400", bg: "bg-emerald-400/10", label: "Отлично" },
  warn: { icon: "AlertTriangle", color: "text-yellow-400", bg: "bg-yellow-400/10", label: "Внимание" },
  error: { icon: "XCircle", color: "text-red-400", bg: "bg-red-400/10", label: "Ошибка" },
};

const priorityConfig = {
  high: { label: "Высокий", color: "text-red-400", dot: "bg-red-400" },
  medium: { label: "Средний", color: "text-yellow-400", dot: "bg-yellow-400" },
  low: { label: "Низкий", color: "text-emerald-400", dot: "bg-emerald-400" },
};

const complexityConfig = {
  "легко": "text-emerald-400 bg-emerald-400/10",
  "средне": "text-yellow-400 bg-yellow-400/10",
  "сложно": "text-red-400 bg-red-400/10",
};

export default function ReportPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url") || "example.ru";
  const [activeCheck, setActiveCheck] = useState<number | null>(null);
  const [isPro] = useState(false);

  const checks = generateReport(url);
  const totalScore = Math.round(checks.reduce((sum, c) => sum + c.score, 0) / checks.length);

  const scoreColor =
    totalScore >= 80 ? "text-emerald-400" :
    totalScore >= 60 ? "text-yellow-400" :
    "text-red-400";

  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (totalScore / 100) * circumference;

  const okCount = checks.filter((c) => c.status === "ok").length;
  const warnCount = checks.filter((c) => c.status === "warn").length;
  const errorCount = checks.filter((c) => c.status === "error").length;

  return (
    <div className="min-h-screen bg-background font-golos">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 pt-28 pb-16">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Icon name="Globe" size={14} />
            <span className="font-medium text-foreground truncate max-w-xs">{decodeURIComponent(url)}</span>
            <span>·</span>
            <span>Только что</span>
          </div>
          <h1 className="text-4xl font-black text-foreground mb-2">Отчёт об аудите</h1>
        </div>

        {/* Score + summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-strong rounded-2xl p-8 flex flex-col items-center justify-center">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="45" fill="none"
                  stroke={totalScore >= 80 ? "#34d399" : totalScore >= 60 ? "#fbbf24" : "#f87171"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-black ${scoreColor}`}>{totalScore}</span>
                <span className="text-xs text-muted-foreground">из 100</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="font-bold text-foreground">
                {totalScore >= 80 ? "Хороший сайт" : totalScore >= 60 ? "Требует доработки" : "Много проблем"}
              </div>
              <div className="text-sm text-muted-foreground">Общая оценка</div>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-3 gap-4">
            <div className="glass rounded-2xl p-5 flex flex-col items-center justify-center gap-2">
              <div className="text-3xl font-black text-emerald-400">{okCount}</div>
              <div className="text-xs text-muted-foreground text-center">Без проблем</div>
              <Icon name="CheckCircle" size={20} className="text-emerald-400" />
            </div>
            <div className="glass rounded-2xl p-5 flex flex-col items-center justify-center gap-2">
              <div className="text-3xl font-black text-yellow-400">{warnCount}</div>
              <div className="text-xs text-muted-foreground text-center">Предупреждения</div>
              <Icon name="AlertTriangle" size={20} className="text-yellow-400" />
            </div>
            <div className="glass rounded-2xl p-5 flex flex-col items-center justify-center gap-2">
              <div className="text-3xl font-black text-red-400">{errorCount}</div>
              <div className="text-xs text-muted-foreground text-center">Ошибки</div>
              <Icon name="XCircle" size={20} className="text-red-400" />
            </div>

            <div className="col-span-3 glass rounded-2xl p-5">
              <div className="text-sm text-muted-foreground mb-3">Что исправить в первую очередь</div>
              <div className="flex flex-wrap gap-2">
                {checks.filter(c => c.status === "error").map(c => (
                  <span key={c.id} className="px-3 py-1 rounded-lg bg-red-400/10 text-red-400 text-xs font-medium">
                    {c.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Checks list */}
        <div className="space-y-3">
          {checks.map((check) => {
            const st = statusConfig[check.status];
            const pr = priorityConfig[check.priority];
            const isOpen = activeCheck === check.id;
            const locked = check.isPro && !isPro;

            return (
              <div key={check.id} className="glass rounded-2xl overflow-hidden transition-all duration-200">
                <button
                  onClick={() => !locked && setActiveCheck(isOpen ? null : check.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
                >
                  <div className={`w-9 h-9 ${st.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon name={st.icon} size={18} className={st.color} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-foreground">{check.title}</span>
                      {locked && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-medium flex items-center gap-1">
                          <Icon name="Lock" size={10} />
                          Pro
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5 truncate">{check.description}</p>
                  </div>

                  <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${pr.dot}`} />
                      <span className={`text-xs ${pr.color}`}>{pr.label}</span>
                    </div>
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${check.score >= 80 ? "bg-emerald-400" : check.score >= 40 ? "bg-yellow-400" : "bg-red-400"}`}
                        style={{ width: `${check.score}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right">{check.score}</span>
                  </div>

                  {!locked && (
                    <Icon
                      name="ChevronDown"
                      size={16}
                      className={`text-muted-foreground transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {locked && !isPro && (
                  <div className="relative">
                    <div className="px-5 py-4 blur-sm select-none pointer-events-none">
                      <div className="h-24 bg-muted/20 rounded-xl" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Icon name="Lock" size={20} className="text-primary mx-auto mb-2" />
                        <p className="text-sm text-foreground font-medium mb-3">Доступно в Pro</p>
                        <button
                          onClick={() => navigate("/pricing")}
                          className="px-4 py-2 rounded-xl gradient-bg text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                        >
                          Получить полный отчёт
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {isOpen && !locked && (
                  <div className="px-5 pb-5 animate-fade-in">
                    <div className="border-t border-border pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="glass rounded-xl p-4">
                          <div className="text-xs text-muted-foreground mb-1">Приоритет</div>
                          <div className={`font-semibold ${pr.color} flex items-center gap-1.5`}>
                            <div className={`w-2 h-2 rounded-full ${pr.dot}`} />
                            {pr.label}
                          </div>
                        </div>
                        <div className="glass rounded-xl p-4">
                          <div className="text-xs text-muted-foreground mb-1">Сложность</div>
                          <span className={`text-sm font-semibold px-2 py-0.5 rounded-lg ${complexityConfig[check.complexity]}`}>
                            {check.complexity}
                          </span>
                        </div>
                        <div className="glass rounded-xl p-4">
                          <div className="text-xs text-muted-foreground mb-1">Время исправления</div>
                          <div className="font-semibold text-foreground">{check.time}</div>
                        </div>
                      </div>

                      <div className="glass rounded-xl p-4 mb-3">
                        <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                          <Icon name="Info" size={12} />
                          Что нашли
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{check.description}</p>
                      </div>

                      <div className="glass rounded-xl p-4">
                        <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                          <Icon name="Wrench" size={12} />
                          Как исправить
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{check.fix}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pro CTA */}
        {!isPro && (
          <div className="mt-8 rounded-2xl p-8 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))", border: "1px solid rgba(99,102,241,0.3)" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-indigo-600/10 rounded-full blur-[60px]" />
            </div>
            <div className="relative">
              <Icon name="Lock" size={32} className="text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-black text-foreground mb-2">
                Разблокируйте полный отчёт
              </h3>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                5 проверок скрыты. В Pro-версии: развёрнутые инструкции, примеры кода,
                ТЗ-генератор, экспорт PDF и сравнение с конкурентами
              </p>
              <button
                onClick={() => navigate("/pricing")}
                className="gradient-bg text-white font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
              >
                Получить полный отчёт — 490₽/мес
              </button>
              <p className="text-xs text-muted-foreground mt-3">7 дней бесплатно для новых пользователей</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
