import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";

const checkSteps = [
  "Проверяем доступность сайта...",
  "Анализируем скорость загрузки...",
  "Тестируем мобильную версию...",
  "Проверяем SSL-сертификат...",
  "Сканируем мета-теги...",
  "Ищем заголовки H1...",
  "Проверяем изображения...",
  "Анализируем robots.txt и sitemap...",
  "Сканируем ссылки...",
  "Оцениваем безопасность...",
  "Готовим отчёт...",
];

const TOTAL_DURATION = 5000; // 5 секунд
const STEP_INTERVAL = TOTAL_DURATION / checkSteps.length;

function isValidUrl(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.includes(".");
}

export default function AuditPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialUrl = searchParams.get("url") || "";

  const [url, setUrl] = useState(initialUrl);
  const [urlError, setUrlError] = useState("");
  const [phase, setPhase] = useState<"input" | "loading">(
    initialUrl && isValidUrl(initialUrl) ? "loading" : "input"
  );
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (phase !== "loading") return;

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setCurrentStep(Math.min(step, checkSteps.length - 1));
      setProgress(Math.min((step / checkSteps.length) * 100, 100));

      if (step >= checkSteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          navigate(`/report?url=${encodeURIComponent(url || initialUrl)}`);
        }, 400);
      }
    }, STEP_INTERVAL);

    return () => clearInterval(interval);
  }, [phase]);

  const handleStart = () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setUrlError("Введите адрес сайта");
      return;
    }
    if (!isValidUrl(trimmed)) {
      setUrlError("Введите корректный адрес, например: mysite.ru");
      return;
    }
    setUrlError("");
    setPhase("loading");
  };

  return (
    <div className="min-h-screen bg-background font-golos">
      <Navbar />

      <div className="flex items-center justify-center min-h-screen px-4 pt-20">
        {phase === "input" && (
          <div className="w-full max-w-xl animate-scale-in">
            <div className="text-center mb-10">
              <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6 glow-indigo">
                <Icon name="Search" size={28} className="text-white" />
              </div>
              <h1 className="text-4xl font-black text-foreground mb-3">Аудит сайта</h1>
              <p className="text-muted-foreground text-lg">Введите адрес сайта для анализа</p>
            </div>

            <div className={`glass-strong rounded-2xl p-2 transition-all ${urlError ? "ring-1 ring-red-400/50" : ""}`}>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Icon name="Globe" size={18} className="text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => { setUrl(e.target.value); setUrlError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleStart()}
                    placeholder="mysite.ru или https://mysite.ru"
                    className="w-full bg-transparent pl-10 pr-4 py-4 text-foreground placeholder:text-muted-foreground outline-none text-base"
                    autoFocus
                  />
                </div>
                <button
                  onClick={handleStart}
                  className="gradient-bg text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg whitespace-nowrap"
                >
                  Запустить
                </button>
              </div>
            </div>

            {urlError && (
              <div className="mt-2 flex items-center gap-2 text-red-400 text-sm animate-fade-in px-1">
                <Icon name="AlertCircle" size={14} />
                {urlError}
              </div>
            )}

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                { icon: "Zap", label: "5 секунд" },
                { icon: "Shield", label: "Безопасно" },
                { icon: "Gift", label: "Бесплатно" },
              ].map((item) => (
                <div key={item.label} className="glass rounded-xl p-3 flex flex-col items-center gap-2">
                  <Icon name={item.icon} size={18} className="text-primary" />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {phase === "loading" && (
          <div className="w-full max-w-lg text-center animate-scale-in">
            <div className="glass-strong rounded-3xl p-10">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 gradient-bg rounded-2xl animate-pulse-slow opacity-30 blur-xl" />
                <div className="relative w-24 h-24 gradient-bg rounded-2xl flex items-center justify-center">
                  <Icon name="Search" size={36} className="text-white animate-spin-slow" />
                </div>
              </div>

              <h2 className="text-2xl font-black text-foreground mb-1">Анализируем сайт</h2>
              <p className="text-sm text-muted-foreground mb-5 truncate px-4">{url || initialUrl}</p>
              <p className="text-primary font-medium mb-8 min-h-[24px] transition-all duration-300">
                {checkSteps[currentStep]}
              </p>

              <div className="relative mb-4">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-bg rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mb-8">
                <span>Начало</span>
                <span>{Math.round(progress)}%</span>
                <span>Готово</span>
              </div>

              <div className="text-left space-y-2">
                {checkSteps.slice(0, Math.min(currentStep + 1, 8)).map((step, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    {i < currentStep ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0">
                        <Icon name="Check" size={12} className="text-emerald-400" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      </div>
                    )}
                    <span className={i < currentStep ? "text-muted-foreground line-through" : "text-foreground"}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
