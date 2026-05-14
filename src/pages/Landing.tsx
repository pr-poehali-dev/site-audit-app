import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";

const advantages = [
  {
    icon: "Zap",
    title: "Мгновенно",
    desc: "Результат за 5 секунд — без регистрации и ожидания",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "rgba(250,204,21,0.12)",
  },
  {
    icon: "Gift",
    title: "Бесплатно",
    desc: "3 полных аудита в месяц — навсегда, без скрытых платежей",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "rgba(52,211,153,0.12)",
  },
  {
    icon: "Target",
    title: "Конкретно",
    desc: "Не просто оценка, а пошаговые инструкции по исправлению",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "rgba(96,165,250,0.12)",
  },
  {
    icon: "TrendingUp",
    title: "Эффективно",
    desc: "Рекомендации напрямую влияют на конверсию и продажи",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "rgba(167,139,250,0.12)",
  },
];

const steps = [
  { num: "01", title: "Введите URL", desc: "Вставьте адрес вашего сайта в поле выше", icon: "Globe" },
  { num: "02", title: "Получите отчёт", desc: "Система проверит 10 ключевых параметров за 5 секунд", icon: "BarChart2" },
  { num: "03", title: "Исправьте ошибки", desc: "Следуйте конкретным инструкциям и улучшите показатели", icon: "CheckCircle" },
];

const faqs = [
  { q: "Как работает аудит?", a: "Мы анализируем ваш сайт по 10 ключевым параметрам: скорость, SEO, безопасность, мобильность и другие. Каждый параметр получает оценку, а вы — конкретные рекомендации." },
  { q: "Нужно ли регистрироваться?", a: "Нет! Базовый аудит доступен без регистрации. Зарегистрируйтесь, чтобы сохранять историю аудитов и получить доступ к Pro-функциям." },
  { q: "Сколько аудитов в бесплатном тарифе?", a: "3 полных аудита в месяц бесплатно. В Pro-тарифе — безлимитные аудиты за 490₽/мес." },
  { q: "Что входит в Pro-тариф?", a: "Безлимитные аудиты, полный отчёт с детальными рекомендациями, экспорт в PDF, история хранится 1 год, сравнение с конкурентами и ТЗ-генератор." },
  { q: "Насколько точны результаты?", a: "Аудит охватывает технические параметры, которые напрямую влияют на SEO и конверсию. Мы проверяем те же показатели, что и Google PageSpeed, GTmetrix и другие профессиональные инструменты." },
];

const scoreCards = [
  { label: "SEO", score: 34, color: "#f87171", track: "#f87171" },
  { label: "Скорость", score: 67, color: "#fbbf24", track: "#fbbf24" },
  { label: "Безопасность", score: 91, color: "#34d399", track: "#34d399" },
  { label: "Мобильность", score: 78, color: "#60a5fa", track: "#60a5fa" },
];

function MiniRing({ score, color }: { score: number; color: string }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
      <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
      <circle
        cx="28" cy="28" r={r} fill="none"
        stroke={color} strokeWidth="4" strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)" }}
      />
    </svg>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [focused, setFocused] = useState(false);

  const handleAudit = () => {
    if (url.trim()) {
      navigate(`/audit?url=${encodeURIComponent(url.trim())}`);
    } else {
      navigate("/audit");
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navbar />

      {/* ─── Hero ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-28 pb-24 overflow-hidden">
        {/* Ambient glows — no grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-indigo-600/8 rounded-full blur-[140px]" />
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-violet-700/6 rounded-full blur-[120px]" />
          <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] bg-blue-700/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-900/20 rounded-full blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-10 animate-fade-in"
            style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
            <span className="text-sm text-indigo-300 font-medium tracking-wide">Бесплатно · Без регистрации · 5 секунд</span>
          </div>

          {/* H1 */}
          <h1 className="text-6xl md:text-8xl font-black leading-[1.05] tracking-tight mb-8 animate-fade-up">
            Узнайте, почему
            <br />
            <span className="gradient-text">ваш сайт не продаёт</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.08s" }}>
            Бесплатный аудит по 10 параметрам: SEO, скорость, безопасность,
            мобильность и многое другое
          </p>

          {/* Input */}
          <div className="max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.16s" }}>
            <div
              className={`rounded-2xl p-2 flex flex-col sm:flex-row gap-2 transition-all duration-300 ${focused ? "input-glow" : ""}`}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: focused ? "1px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(32px)",
              }}
            >
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Icon name="Globe" size={18} className="text-muted-foreground" />
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAudit()}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="mysite.ru или https://mysite.ru"
                  className="w-full bg-transparent pl-11 pr-4 py-4 text-foreground placeholder:text-muted-foreground outline-none text-base"
                />
              </div>
              <button
                onClick={handleAudit}
                className="gradient-bg text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-150 whitespace-nowrap glow-sm"
                style={{ boxShadow: "0 4px 24px rgba(99,102,241,0.35)" }}
              >
                Запустить аудит
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Уже проверили <span className="text-foreground font-semibold">12 847</span> сайтов
            </p>
          </div>

          {/* Score cards */}
          <div className="mt-20 flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.24s" }}>
            {scoreCards.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="relative flex items-center justify-center">
                  <MiniRing score={item.score} color={item.color} />
                  <span className="absolute text-sm font-black" style={{ color: item.color }}>{item.score}</span>
                </div>
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                  <div className="text-xs font-medium mt-0.5" style={{ color: item.color }}>
                    {item.score >= 80 ? "Отлично" : item.score >= 55 ? "Норма" : "Проблема"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Advantages ───────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">Почему SiteAudit</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              Всё что нужно для роста
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Простой инструмент с профессиональными результатами</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {advantages.map((adv, i) => (
              <div
                key={adv.title}
                className="relative rounded-2xl p-7 group cursor-default glass-hover"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: `1px solid ${adv.border}`,
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <div className={`w-12 h-12 ${adv.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon name={adv.icon} size={22} className={adv.color} />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground tracking-tight">{adv.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─────────────────────────────── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-violet-700/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-4xl">
          <div className="text-center mb-20">
            <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">Процесс</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">Как это работает</h2>
            <p className="text-muted-foreground text-lg">Три простых шага до результата</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative text-center group">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[65%] w-[70%] h-px"
                    style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.4) 0%, transparent 100%)" }} />
                )}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl relative"
                    style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
                    <span className="text-3xl font-black gradient-text-brand">{step.num}</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.15)" }}>
                    <Icon name={step.icon} size={18} className="text-indigo-400" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm max-w-[200px] mx-auto">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing preview ──────────────────────────── */}
      <section className="py-28 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-20">
            <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">Тарифы</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">Начните бесплатно</h2>
            <p className="text-muted-foreground text-lg">Обновитесь когда нужно больше</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="rounded-2xl p-8 flex flex-col"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="mb-8">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-5"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                  Free
                </div>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-5xl font-black text-foreground">0₽</span>
                </div>
                <div className="text-muted-foreground text-sm">навсегда</div>
              </div>
              <ul className="space-y-3.5 mb-10 flex-1">
                {["3 аудита в месяц", "Базовый отчёт (10 параметров)", "Хранение 24 часа", "Основные рекомендации"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <div className="w-5 h-5 rounded-full bg-emerald-400/15 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={11} className="text-emerald-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/audit")}
                className="w-full py-3.5 rounded-xl text-foreground font-semibold transition-colors"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.09)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
              >
                Начать бесплатно
              </button>
            </div>

            {/* Pro */}
            <div className="relative rounded-2xl p-8 flex flex-col overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.14), rgba(139,92,246,0.08))", border: "1px solid rgba(99,102,241,0.35)" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-indigo-600/12 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute top-5 right-5">
                <span className="px-3 py-1.5 rounded-full text-xs font-bold gradient-bg text-white"
                  style={{ boxShadow: "0 4px 16px rgba(99,102,241,0.4)" }}>
                  🔥 Популярный
                </span>
              </div>
              <div className="relative mb-8">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-5 bg-primary/15 text-primary">
                  Pro
                </div>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-5xl font-black text-foreground">490₽</span>
                  <span className="text-muted-foreground pb-2">/ месяц</span>
                </div>
                <div className="text-muted-foreground text-sm">7 дней бесплатно · Отмена в любой момент</div>
              </div>
              <ul className="relative space-y-3.5 mb-10 flex-1">
                {[
                  "Безлимитные аудиты",
                  "Полный отчёт + развёрнутые инструкции",
                  "Примеры кода для исправлений",
                  "ТЗ-генератор для специалистов",
                  "Сравнение с конкурентами",
                  "Экспорт PDF / Google Docs / Excel",
                  "Хранение истории 1 год",
                  "Приоритетная поддержка",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={11} className="text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/pricing")}
                className="relative w-full py-3.5 rounded-xl gradient-bg text-white font-bold hover:opacity-90 transition-opacity"
                style={{ boxShadow: "0 8px 32px rgba(99,102,241,0.45)" }}
              >
                Начать бесплатно
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Вопросы и ответы</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-7 py-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-semibold text-foreground text-[15px]">{faq.q}</span>
                  <Icon
                    name="ChevronDown"
                    size={17}
                    className={`text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-7 pb-6 animate-fade-in">
                    <p className="text-muted-foreground leading-relaxed text-[15px]">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-3xl p-14 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.07))", border: "1px solid rgba(99,102,241,0.25)" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-indigo-600/12 rounded-full blur-[80px]" />
            </div>
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-5 leading-tight">
                Готовы улучшить
                <br />
                <span className="gradient-text">ваш сайт?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10">
                Первый аудит — бесплатно. Результат — за 5 секунд.
              </p>
              <button
                onClick={() => navigate("/audit")}
                className="gradient-bg text-white font-bold px-10 py-4 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all text-lg"
                style={{ boxShadow: "0 8px 40px rgba(99,102,241,0.45)" }}
              >
                Запустить бесплатный аудит
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────── */}
      <footer className="border-t border-border py-14 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={15} className="text-white" />
                </div>
                <span className="font-bold text-lg text-foreground tracking-tight">SiteAudit</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Профессиональный аудит сайтов. Узнайте, почему ваш сайт не продаёт.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm tracking-wide">Продукт</h4>
              <ul className="space-y-2.5">
                {["Аудит сайта", "Тарифы", "API"].map((item) => (
                  <li key={item}>
                    <button className="text-muted-foreground hover:text-foreground text-sm transition-colors">{item}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm tracking-wide">Компания</h4>
              <ul className="space-y-2.5">
                {["О нас", "Блог", "Контакты"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => item === "Контакты" && navigate("/contacts")}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm tracking-wide">Правовые</h4>
              <ul className="space-y-2.5">
                {["Политика конфиденциальности", "Условия использования"].map((item) => (
                  <li key={item}>
                    <button className="text-muted-foreground hover:text-foreground text-sm transition-colors">{item}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">© 2024 SiteAudit. Все права защищены.</p>
            <p className="text-muted-foreground text-xs">Сделано с ❤️ в России</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
