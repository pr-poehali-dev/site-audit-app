import { useState, useMemo } from "react";
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
  isPro: boolean;
}

const checkTemplates = [
  {
    id: 1,
    title: "Доступность сайта",
    priority: "high" as const,
    isPro: false,
    variants: {
      ok: { description: "Сайт доступен и отвечает на запросы менее чем за 200мс", fix: "Сайт работает корректно. Рекомендуем настроить мониторинг доступности 24/7." },
      warn: { description: "Сайт доступен, но время ответа сервера превышает 500мс", fix: "Оптимизируйте сервер или перейдите на более быстрый хостинг. Рассмотрите CDN." },
      error: { description: "Сайт недоступен или возвращает ошибку 5xx", fix: "Проверьте состояние сервера, срок действия домена и настройки DNS." },
    },
    complexity: "легко" as const,
    time: "5 мин",
  },
  {
    id: 2,
    title: "Скорость загрузки",
    priority: "high" as const,
    isPro: false,
    variants: {
      ok: { description: "Отличная скорость загрузки: менее 1.5с на мобильных", fix: "Показатели в норме. Периодически проверяйте через PageSpeed Insights." },
      warn: { description: "Время загрузки 3–5с — выше нормы для мобильных устройств", fix: "Оптимизируйте изображения (WebP), включите gzip-сжатие, настройте кэширование браузера." },
      error: { description: "Критически медленная загрузка: более 6 секунд", fix: "Срочно: сожмите все изображения, минифицируйте JS/CSS, настройте lazy-loading." },
    },
    complexity: "средне" as const,
    time: "2–4 часа",
  },
  {
    id: 3,
    title: "Мобильная адаптивность",
    priority: "medium" as const,
    isPro: false,
    variants: {
      ok: { description: "Сайт корректно отображается на всех размерах экранов", fix: "Хорошие показатели. Проверяйте на новых устройствах при обновлениях дизайна." },
      warn: { description: "Есть проблемы с отображением на экранах менее 375px", fix: "Исправьте overflow у контейнеров, добавьте медиа-запросы для малых экранов." },
      error: { description: "Сайт не адаптирован для мобильных устройств", fix: "Добавьте <meta name=\"viewport\"> и реализуйте адаптивную вёрстку (CSS Grid / Flexbox)." },
    },
    complexity: "сложно" as const,
    time: "4–8 часов",
  },
  {
    id: 4,
    title: "HTTPS-сертификат",
    priority: "high" as const,
    isPro: false,
    variants: {
      ok: { description: "SSL-сертификат установлен, действителен, автообновление настроено", fix: "Сертификат в полном порядке. Убедитесь в автоматическом обновлении Let's Encrypt." },
      warn: { description: "Сертификат истекает через 14 дней", fix: "Обновите SSL-сертификат. Настройте автоматическое обновление через certbot." },
      error: { description: "HTTPS-сертификат отсутствует или просрочен", fix: "Установите бесплатный Let's Encrypt или платный сертификат. Без HTTPS Google понижает позиции." },
    },
    complexity: "легко" as const,
    time: "30 мин",
  },
  {
    id: 5,
    title: "Meta title и description",
    priority: "high" as const,
    isPro: false,
    variants: {
      ok: { description: "Title (54 симв.) и description (158 симв.) заполнены корректно", fix: "Мета-теги в норме. Убедитесь, что они уникальны для каждой страницы." },
      warn: { description: "Title слишком длинный (78 симв.), description отсутствует на 3 страницах", fix: "Сократите title до 50–60 символов. Добавьте description 150–160 символов на все страницы." },
      error: { description: "Meta title и description полностью отсутствуют", fix: "Добавьте <title> и <meta name=\"description\"> в <head> каждой страницы. Это критично для SEO." },
    },
    complexity: "легко" as const,
    time: "15–30 мин",
  },
  {
    id: 6,
    title: "Заголовок H1",
    priority: "medium" as const,
    isPro: false,
    variants: {
      ok: { description: "На главной странице один корректный H1 с ключевым словом", fix: "Отлично. Проверьте H1 на всех внутренних страницах — на каждой должен быть свой." },
      warn: { description: "Найдено 3 заголовка H1 на одной странице", fix: "Оставьте один H1 с главным ключевым словом. Остальные замените на H2 или H3." },
      error: { description: "H1 полностью отсутствует на сайте", fix: "Добавьте тег <h1> с главным ключевым словом на каждую страницу. Без H1 SEO ухудшается." },
    },
    complexity: "легко" as const,
    time: "20 мин",
  },
  {
    id: 7,
    title: "Alt у изображений",
    priority: "medium" as const,
    isPro: true,
    variants: {
      ok: { description: "Все изображения имеют описательные атрибуты alt", fix: "Отличная практика! Убедитесь, что alt-тексты содержательны, а не просто 'image1.jpg'." },
      warn: { description: "5 из 12 изображений не имеют атрибута alt", fix: "Добавьте alt=\"описание\" к каждому изображению. Важно для SEO и доступности." },
      error: { description: "8 из 10 изображений без alt. Критическая ошибка SEO", fix: "Срочно добавьте alt ко всем изображениям. Поисковики не могут их индексировать без alt." },
    },
    complexity: "легко" as const,
    time: "30 мин",
  },
  {
    id: 8,
    title: "Robots.txt и Sitemap",
    priority: "medium" as const,
    isPro: true,
    variants: {
      ok: { description: "robots.txt настроен, sitemap.xml найден и указан в нём", fix: "Всё настроено. Отправьте sitemap в Google Search Console и Яндекс.Вебмастер." },
      warn: { description: "robots.txt найден, sitemap.xml отсутствует", fix: "Создайте sitemap.xml и добавьте Sitemap: https://yoursite.ru/sitemap.xml в robots.txt." },
      error: { description: "robots.txt и sitemap.xml полностью отсутствуют", fix: "Создайте оба файла. Без них поисковики хуже индексируют ваш сайт." },
    },
    complexity: "средне" as const,
    time: "1 час",
  },
  {
    id: 9,
    title: "Битые ссылки",
    priority: "high" as const,
    isPro: true,
    variants: {
      ok: { description: "Битых ссылок не обнаружено — все URL возвращают корректный статус", fix: "Регулярно проверяйте ссылки инструментом Screaming Frog или Ahrefs." },
      warn: { description: "Найдено 2 ссылки с редиректом (301), замедляющие загрузку", fix: "Замените редиректы на прямые ссылки, чтобы ускорить загрузку страниц." },
      error: { description: "Обнаружено 4 битые ссылки (404), включая в главной навигации", fix: "Исправьте или удалите ссылки на 404-страницы. Настройте 301-редиректы для старых URL." },
    },
    complexity: "средне" as const,
    time: "1–2 часа",
  },
  {
    id: 10,
    title: "Безопасность",
    priority: "high" as const,
    isPro: true,
    variants: {
      ok: { description: "Заголовки безопасности настроены: CSP, HSTS, X-Frame-Options", fix: "Отличная защита. Периодически проверяйте через securityheaders.com." },
      warn: { description: "Отсутствуют заголовки CSP и X-Frame-Options", fix: "Добавьте HTTP-заголовки: Content-Security-Policy, X-Frame-Options: DENY, X-Content-Type-Options." },
      error: { description: "Критические уязвимости: нет HSTS, CSP, защиты от XSS", fix: "Настройте все заголовки безопасности. Без них сайт уязвим для XSS и clickjacking атак." },
    },
    complexity: "сложно" as const,
    time: "2–4 часа",
  },
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateReport(url: string): { checks: CheckPoint[]; totalScore: number } {
  // Seed based on URL so same URL = same result within session
  let seed = 0;
  for (let i = 0; i < url.length; i++) seed += url.charCodeAt(i);
  const rand = seededRandom(seed || 42);

  const statuses: Status[] = ["ok", "warn", "error"];
  const weights = [0.35, 0.40, 0.25]; // ok, warn, error

  const checks: CheckPoint[] = checkTemplates.map((tpl) => {
    const r = rand();
    let status: Status;
    if (r < weights[0]) status = "ok";
    else if (r < weights[0] + weights[1]) status = "warn";
    else status = "error";

    const scoreMap = { ok: 85 + Math.floor(rand() * 15), warn: 40 + Math.floor(rand() * 35), error: Math.floor(rand() * 30) };

    return {
      id: tpl.id,
      title: tpl.title,
      status,
      score: scoreMap[status],
      priority: tpl.priority,
      description: tpl.variants[status].description,
      fix: tpl.variants[status].fix,
      complexity: tpl.complexity,
      time: tpl.time,
      isPro: tpl.isPro,
    };
  });

  // Clamp total score 40–85
  const raw = Math.round(checks.reduce((sum, c) => sum + c.score, 0) / checks.length);
  const totalScore = Math.max(40, Math.min(85, raw));

  return { checks, totalScore };
}

const statusConfig = {
  ok: { icon: "CheckCircle", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  warn: { icon: "AlertTriangle", color: "text-yellow-400", bg: "bg-yellow-400/10" },
  error: { icon: "XCircle", color: "text-red-400", bg: "bg-red-400/10" },
};

const priorityConfig = {
  high: { label: "Высокий", color: "text-red-400", dot: "bg-red-400" },
  medium: { label: "Средний", color: "text-yellow-400", dot: "bg-yellow-400" },
  low: { label: "Низкий", color: "text-emerald-400", dot: "bg-emerald-400" },
};

const complexityConfig: Record<string, string> = {
  "легко": "text-emerald-400 bg-emerald-400/10",
  "средне": "text-yellow-400 bg-yellow-400/10",
  "сложно": "text-red-400 bg-red-400/10",
};

export default function ReportPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url") || "example.ru";
  const [activeCheck, setActiveCheck] = useState<number | null>(null);

  const { checks, totalScore } = useMemo(() => generateReport(url), [url]);

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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-4xl font-black text-foreground">Отчёт об аудите</h1>
            <button
              onClick={() => navigate("/audit")}
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <Icon name="RefreshCw" size={14} />
              Проверить другой сайт
            </button>
          </div>
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
              <div className="text-sm text-muted-foreground mb-3">Исправить в первую очередь</div>
              <div className="flex flex-wrap gap-2">
                {checks.filter(c => c.status === "error" && !c.isPro).map(c => (
                  <span key={c.id} className="px-3 py-1 rounded-lg bg-red-400/10 text-red-400 text-xs font-medium">
                    {c.title}
                  </span>
                ))}
                {checks.filter(c => c.status === "error").length === 0 && (
                  <span className="text-sm text-muted-foreground">Критических ошибок не обнаружено</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Checks list */}
        <div className="space-y-3 mb-8">
          {checks.map((check) => {
            const st = statusConfig[check.status];
            const pr = priorityConfig[check.priority];
            const isOpen = activeCheck === check.id;

            if (check.isPro) {
              return (
                <div key={check.id} className="glass rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-4 px-5 py-4">
                    <div className={`w-9 h-9 ${st.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon name={st.icon} size={18} className={st.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground">{check.title}</span>
                        <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-medium flex items-center gap-1">
                          <Icon name="Lock" size={10} />
                          Pro
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Blurred paywall */}
                  <div className="relative">
                    <div className="px-5 pb-5 blur-sm select-none pointer-events-none opacity-60">
                      <div className="border-t border-border pt-4 space-y-3">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                        <div className="h-10 bg-muted rounded" />
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => navigate("/pricing")}
                        className="px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg flex items-center gap-2"
                      >
                        <Icon name="Lock" size={14} />
                        Открыть в Pro
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={check.id} className="glass rounded-2xl overflow-hidden transition-all duration-200">
                <button
                  onClick={() => setActiveCheck(isOpen ? null : check.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
                >
                  <div className={`w-9 h-9 ${st.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon name={st.icon} size={18} className={st.color} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-foreground">{check.title}</span>
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

                  <Icon
                    name="ChevronDown"
                    size={16}
                    className={`text-muted-foreground transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 animate-fade-in">
                    <div className="border-t border-border pt-4">
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="glass rounded-xl p-3">
                          <div className="text-xs text-muted-foreground mb-1">Приоритет</div>
                          <div className={`text-sm font-semibold ${pr.color} flex items-center gap-1.5`}>
                            <div className={`w-2 h-2 rounded-full ${pr.dot}`} />
                            {pr.label}
                          </div>
                        </div>
                        <div className="glass rounded-xl p-3">
                          <div className="text-xs text-muted-foreground mb-1">Сложность</div>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${complexityConfig[check.complexity]}`}>
                            {check.complexity}
                          </span>
                        </div>
                        <div className="glass rounded-xl p-3">
                          <div className="text-xs text-muted-foreground mb-1">Время</div>
                          <div className="text-sm font-semibold text-foreground">{check.time}</div>
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
        <div className="rounded-2xl p-8 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))", border: "1px solid rgba(99,102,241,0.3)" }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-indigo-600/10 rounded-full blur-[60px]" />
          </div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-medium mb-4">
              <Icon name="Lock" size={12} />
              4 проверки скрыты в бесплатном тарифе
            </div>
            <h3 className="text-2xl font-black text-foreground mb-2">Получите полный отчёт</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Откройте детальные рекомендации, примеры кода, ТЗ-генератор, экспорт PDF и сравнение с конкурентами
            </p>
            <button
              onClick={() => navigate("/pricing")}
              className="gradient-bg text-white font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
            >
              Смотреть тарифы
            </button>
            <p className="text-xs text-muted-foreground mt-3">7 дней бесплатно · Отмена в любое время</p>
          </div>
        </div>
      </div>
    </div>
  );
}
