import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";

const advantages = [
  {
    icon: "Zap",
    title: "Мгновенно",
    desc: "Результат за 30 секунд — без регистрации и ожидания",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    icon: "Gift",
    title: "Бесплатно",
    desc: "3 полных аудита в месяц — навсегда, без скрытых платежей",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: "Target",
    title: "Конкретно",
    desc: "Не просто оценка, а пошаговые инструкции по исправлению",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: "TrendingUp",
    title: "Эффективно",
    desc: "Рекомендации напрямую влияют на конверсию и продажи",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
];

const steps = [
  { num: "01", title: "Введите URL", desc: "Вставьте адрес вашего сайта в поле выше" },
  { num: "02", title: "Получите отчёт", desc: "Система проверит 10 ключевых параметров за 30 секунд" },
  { num: "03", title: "Исправьте ошибки", desc: "Следуйте конкретным инструкциям и улучшите показатели" },
];

const faqs = [
  { q: "Как работает аудит?", a: "Мы анализируем ваш сайт по 10 ключевым параметрам: скорость, SEO, безопасность, мобильность и другие. Каждый параметр получает оценку, а вы — конкретные рекомендации." },
  { q: "Нужно ли регистрироваться?", a: "Нет! Базовый аудит доступен без регистрации. Зарегистрируйтесь, чтобы сохранять историю аудитов и получить доступ к Pro-функциям." },
  { q: "Сколько аудитов в бесплатном тарифе?", a: "3 полных аудита в месяц бесплатно. В Pro-тарифе — безлимитные аудиты за 490₽/мес." },
  { q: "Что входит в Pro-тариф?", a: "Безлимитные аудиты, полный отчёт с детальными рекомендациями, экспорт в PDF, история хранится 1 год, сравнение с конкурентами и ТЗ-генератор." },
  { q: "Насколько точны результаты?", a: "Аудит охватывает технические параметры, которые напрямую влияют на SEO и конверсию. Мы проверяем те же показатели, что и Google PageSpeed, GTmetrix и другие профессиональные инструменты." },
];

export default function Landing() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleAudit = () => {
    if (url.trim()) {
      navigate(`/audit?url=${encodeURIComponent(url.trim())}`);
    } else {
      navigate("/audit");
    }
  };

  return (
    <div className="min-h-screen bg-background font-golos">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-600/8 rounded-full blur-[80px]" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm text-primary font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
            Бесплатно · Без регистрации · 30 секунд
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 animate-fade-up">
            Узнайте, почему
            <br />
            <span className="gradient-text">ваш сайт не продаёт</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Бесплатный аудит по 10 параметрам: SEO, скорость, безопасность,
            мобильность и многое другое
          </p>

          <div className="max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="glass-strong rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Icon name="Globe" size={18} className="text-muted-foreground" />
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAudit()}
                  placeholder="https://yoursite.ru"
                  className="w-full bg-transparent pl-10 pr-4 py-4 text-foreground placeholder:text-muted-foreground outline-none text-base"
                />
              </div>
              <button
                onClick={handleAudit}
                className="gradient-bg text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-indigo-500/30 whitespace-nowrap"
              >
                Запустить аудит
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Уже проверили <span className="text-foreground font-medium">12 847</span> сайтов
            </p>
          </div>

          {/* Floating score cards */}
          <div className="mt-20 flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {[
              { label: "SEO", score: 34, color: "text-red-400" },
              { label: "Скорость", score: 67, color: "text-yellow-400" },
              { label: "Безопасность", score: 91, color: "text-emerald-400" },
              { label: "Мобильность", score: 78, color: "text-blue-400" },
            ].map((item) => (
              <div key={item.label} className="glass rounded-2xl px-6 py-4 flex items-center gap-3">
                <div className={`text-2xl font-black ${item.color}`}>{item.score}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Почему <span className="gradient-text">SiteAudit</span>
            </h2>
            <p className="text-muted-foreground text-lg">Всё что нужно для роста вашего сайта</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {advantages.map((adv, i) => (
              <div
                key={adv.title}
                className="glass rounded-2xl p-6 hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1 group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-12 h-12 ${adv.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon name={adv.icon} size={22} className={adv.color} />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{adv.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Как это работает</h2>
            <p className="text-muted-foreground text-lg">Три простых шага до результата</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative text-center group">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-full h-px bg-gradient-to-r from-border to-transparent" />
                )}
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 glass-strong rounded-2xl flex items-center justify-center group-hover:glow-indigo transition-all duration-300">
                    <span className="gradient-text text-3xl font-black">{step.num}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Тарифы</h2>
            <p className="text-muted-foreground text-lg">Начните бесплатно, обновитесь когда нужно</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="glass rounded-2xl p-8 flex flex-col">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4">
                  FREE
                </div>
                <div className="text-4xl font-black text-foreground mb-1">0₽</div>
                <div className="text-muted-foreground text-sm">навсегда</div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {["3 аудита в месяц", "Базовый отчёт (10 параметров)", "Хранение 24 часа", "Основные рекомендации"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <Icon name="Check" size={16} className="text-emerald-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/cabinet")}
                className="w-full py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-white/5 transition-colors"
              >
                Зарегистрироваться
              </button>
            </div>

            {/* Pro */}
            <div className="relative rounded-2xl p-8 flex flex-col overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))", border: "1px solid rgba(99,102,241,0.3)" }}>
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold gradient-bg text-white">
                  7 дней бесплатно
                </span>
              </div>
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-xs font-medium text-primary mb-4">
                  PRO
                </div>
                <div className="text-4xl font-black text-foreground mb-1">490₽</div>
                <div className="text-muted-foreground text-sm">в месяц</div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
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
                    <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/pricing")}
                className="w-full py-3 rounded-xl gradient-bg text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                Начать бесплатно
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Вопросы и ответы</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-foreground">{faq.q}</span>
                  <Icon
                    name="ChevronDown"
                    size={18}
                    className={`text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="glass-strong rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-indigo-600/15 rounded-full blur-[60px]" />
            </div>
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Готовы улучшить
                <br />
                <span className="gradient-text">ваш сайт?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Первый аудит — бесплатно. Результат — за 30 секунд.
              </p>
              <button
                onClick={() => navigate("/audit")}
                className="gradient-bg text-white font-bold px-10 py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg text-lg glow-indigo"
              >
                Запустить бесплатный аудит
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={16} className="text-white" />
                </div>
                <span className="font-bold text-lg text-foreground">SiteAudit</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Профессиональный аудит сайтов. Узнайте, почему ваш сайт не продаёт.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Продукт</h4>
              <ul className="space-y-2">
                {["Аудит сайта", "Тарифы", "API"].map((item) => (
                  <li key={item}>
                    <button className="text-muted-foreground hover:text-foreground text-sm transition-colors">{item}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Компания</h4>
              <ul className="space-y-2">
                {["О нас", "Блог", "Контакты"].map((item) => (
                  <li key={item}>
                    <button onClick={() => navigate("/contacts")} className="text-muted-foreground hover:text-foreground text-sm transition-colors">{item}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>support@siteaudit.ru</li>
                <li>Telegram: @siteaudit</li>
                <li>WhatsApp: +7 (900) 000-00-00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">© 2024 SiteAudit. Все права защищены.</p>
            <div className="flex gap-4">
              <button className="text-muted-foreground hover:text-foreground text-sm transition-colors">Политика конфиденциальности</button>
              <button className="text-muted-foreground hover:text-foreground text-sm transition-colors">Пользовательское соглашение</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}