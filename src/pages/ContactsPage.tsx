import { useState } from "react";
import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";

export default function ContactsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!name || !email || !message) return;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background font-golos">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 pt-28 pb-16">
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
            <span className="gradient-text">Контакты</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-md mx-auto">
            Есть вопросы? Напишите нам — ответим быстро
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {[
              {
                icon: "Mail",
                title: "Email поддержки",
                value: "support@siteaudit.ru",
                desc: "Отвечаем в течение 24 часов",
                href: "mailto:support@siteaudit.ru",
                color: "text-blue-400",
                bg: "bg-blue-400/10",
              },
              {
                icon: "MessageCircle",
                title: "Telegram",
                value: "@siteaudit_support",
                desc: "Самый быстрый способ связи",
                href: "https://t.me/siteaudit_support",
                color: "text-sky-400",
                bg: "bg-sky-400/10",
              },
              {
                icon: "Phone",
                title: "WhatsApp",
                value: "+7 (900) 000-00-00",
                desc: "Пн–Пт, 9:00–18:00 МСК",
                href: "https://wa.me/79000000000",
                color: "text-emerald-400",
                bg: "bg-emerald-400/10",
              },
            ].map((contact) => (
              <a
                key={contact.title}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-6 flex items-start gap-4 hover:bg-white/[0.05] transition-all duration-200 hover:-translate-y-0.5 block"
              >
                <div className={`w-12 h-12 ${contact.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon name={contact.icon} size={22} className={contact.color} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">{contact.title}</div>
                  <div className="font-bold text-foreground">{contact.value}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{contact.desc}</div>
                </div>
              </a>
            ))}

            {/* Legal */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-bold text-foreground mb-4">Правовые документы</h3>
              <div className="space-y-2">
                {[
                  { label: "Политика конфиденциальности", icon: "Shield" },
                  { label: "Пользовательское соглашение", icon: "FileText" },
                  { label: "Договор оферты", icon: "File" },
                ].map((doc) => (
                  <button
                    key={doc.label}
                    className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/5 transition-colors text-sm text-muted-foreground hover:text-foreground group text-left"
                  >
                    <Icon name={doc.icon} size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    {doc.label}
                    <Icon name="ExternalLink" size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="glass-strong rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center animate-scale-in">
                <div className="w-20 h-20 bg-emerald-400/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon name="CheckCircle" size={36} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-3">Сообщение отправлено!</h3>
                <p className="text-muted-foreground text-lg">
                  Мы получили ваше обращение и ответим в течение 24 часов
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl border border-border text-foreground text-sm hover:bg-white/5 transition-colors"
                >
                  Отправить ещё одно
                </button>
              </div>
            ) : (
              <div className="glass-strong rounded-2xl p-8">
                <h2 className="text-2xl font-black text-foreground mb-6">Написать нам</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Ваше имя</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-muted rounded-xl px-4 py-3 text-foreground outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-muted rounded-xl px-4 py-3 text-foreground outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground"
                      placeholder="ivan@example.ru"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Сообщение</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className="w-full bg-muted rounded-xl px-4 py-3 text-foreground outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground resize-none"
                      placeholder="Опишите ваш вопрос..."
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!name || !email || !message}
                    className="w-full gradient-bg text-white font-bold py-3.5 rounded-xl hover:opacity-90 disabled:opacity-40 transition-all shadow-lg"
                  >
                    Отправить сообщение
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
