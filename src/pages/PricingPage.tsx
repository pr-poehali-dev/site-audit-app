import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";

const freeFeatures = [
  { text: "3 аудита в месяц", ok: true },
  { text: "10 параметров проверки", ok: true },
  { text: "Базовые рекомендации", ok: true },
  { text: "Хранение отчётов 24 часа", ok: true },
  { text: "Развёрнутые инструкции", ok: false },
  { text: "Примеры кода", ok: false },
  { text: "ТЗ-генератор", ok: false },
  { text: "Экспорт PDF / Google Docs", ok: false },
  { text: "Сравнение с конкурентами", ok: false },
  { text: "Приоритетная поддержка", ok: false },
];

const proFeatures = [
  { text: "Безлимитные аудиты", ok: true },
  { text: "10 параметров проверки", ok: true },
  { text: "Полные развёрнутые рекомендации", ok: true },
  { text: "Примеры кода (HTML/CSS/JS)", ok: true },
  { text: "Хранение истории 1 год", ok: true },
  { text: "ТЗ-генератор для специалистов", ok: true },
  { text: "Экспорт PDF / Google Docs / Excel", ok: true },
  { text: "Сравнение с конкурентами", ok: true },
  { text: "График прогресса и динамика", ok: true },
  { text: "Приоритетная поддержка (2 часа)", ok: true },
];

const bonuses = [
  {
    icon: "FileText",
    title: "Чек-лист «100 точек роста»",
    desc: "Скачиваемый PDF с полным списком улучшений для вашего сайта",
  },
  {
    icon: "MessageCircle",
    title: "Закрытый Telegram-канал",
    desc: "Советы по SEO, конверсии и росту сайта от практиков",
  },
  {
    icon: "Headphones",
    title: "Приоритетная поддержка",
    desc: "Ответ в течение 2 часов на любой вопрос",
  },
];

export default function PricingPage() {
  const navigate = useNavigate();
  const [showPayStub, setShowPayStub] = useState(false);

  return (
    <div className="min-h-screen bg-background font-golos">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 pt-28 pb-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm text-primary font-medium mb-6">
            <Icon name="Sparkles" size={14} />
            7 дней бесплатно для новых пользователей
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
            Простые <span className="gradient-text">тарифы</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-lg mx-auto">
            Начните бесплатно. Обновитесь когда нужно больше.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Free */}
          <div className="glass rounded-2xl p-8 flex flex-col animate-fade-up">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-xs font-bold text-muted-foreground mb-4 uppercase tracking-wider">
                Free
              </div>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-5xl font-black text-foreground">0₽</span>
              </div>
              <div className="text-muted-foreground">навсегда бесплатно</div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {freeFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${f.ok ? "bg-emerald-400/15" : "bg-muted"}`}>
                    <Icon
                      name={f.ok ? "Check" : "X"}
                      size={12}
                      className={f.ok ? "text-emerald-400" : "text-muted-foreground/40"}
                    />
                  </div>
                  <span className={f.ok ? "text-foreground" : "text-muted-foreground/50 line-through"}>{f.text}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate("/cabinet")}
              className="w-full py-3.5 rounded-xl border border-border text-foreground font-semibold hover:bg-white/5 transition-colors"
            >
              Начать бесплатно
            </button>
          </div>

          {/* Pro */}
          <div
            className="relative rounded-2xl p-8 flex flex-col overflow-hidden animate-fade-up"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))",
              border: "1px solid rgba(99,102,241,0.35)",
              animationDelay: "0.1s"
            }}
          >
            {/* Badge */}
            <div className="absolute top-6 right-6">
              <div className="gradient-bg text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                🔥 Популярный
              </div>
            </div>

            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-indigo-600/15 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-xs font-bold text-primary mb-4 uppercase tracking-wider">
                Pro
              </div>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-5xl font-black text-foreground">490₽</span>
                <span className="text-muted-foreground pb-2">/ месяц</span>
              </div>
              <div className="text-muted-foreground">7 дней бесплатно · Отмена в любой момент</div>
            </div>

            <ul className="relative space-y-3 mb-8 flex-1">
              {proFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={12} className="text-primary" />
                  </div>
                  <span className="text-foreground">{f.text}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setShowPayStub(true)}
              className="relative w-full py-3.5 rounded-xl gradient-bg text-white font-bold hover:opacity-90 transition-opacity shadow-lg glow-indigo"
            >
              Начать 7 дней бесплатно
            </button>
            <p className="text-center text-xs text-muted-foreground mt-3">
              После пробного периода — 490₽/мес. Отмените в любое время.
            </p>
          </div>
        </div>

        {/* Bonuses */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-foreground mb-2">
            Бонусы для <span className="gradient-text">Pro</span>
          </h2>
          <p className="text-muted-foreground">Дополнительные преимущества включены в подписку</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {bonuses.map((b, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-4">
                <Icon name={b.icon} size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="glass-strong rounded-2xl p-8">
          <h3 className="text-xl font-black text-foreground mb-6 text-center">Часто спрашивают о тарифах</h3>
          <div className="space-y-4">
            {[
              {
                q: "Можно ли отменить подписку?",
                a: "Да, в любой момент. После отмены доступ к Pro сохраняется до конца оплаченного периода.",
              },
              {
                q: "Что будет после пробного периода?",
                a: "Автоматически спишется 490₽ за первый месяц. Вы получите напоминание за 3 дня до окончания пробного периода.",
              },
              {
                q: "Есть ли скидки для команд?",
                a: "Свяжитесь с нами — обсудим индивидуальные условия для команд от 5 человек.",
              },
            ].map((item, i) => (
              <div key={i} className="border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="font-semibold text-foreground mb-1">{item.q}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment stub modal */}
      {showPayStub && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowPayStub(false)}
        >
          <div
            className="glass-strong rounded-2xl p-8 max-w-sm w-full text-center animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-5 glow-indigo">
              <Icon name="Sparkles" size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-black text-foreground mb-3">Спасибо за интерес!</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Оплата скоро будет подключена. Мы уведомим вас, когда Pro-тариф станет доступен.
            </p>
            <button
              onClick={() => navigate("/contacts")}
              className="w-full gradient-bg text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity mb-3"
            >
              Оставить заявку
            </button>
            <button
              onClick={() => setShowPayStub(false)}
              className="w-full py-3 rounded-xl text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}