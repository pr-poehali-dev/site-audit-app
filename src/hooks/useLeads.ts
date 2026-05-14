const LEADS_URL = "https://functions.poehali.dev/07ad3247-1333-45f5-a291-33fa1b52ef40";

export async function submitLead(email: string, source: string, url?: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(LEADS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase(), source, url: url || "" }),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error || "Ошибка отправки" };
    return { ok: true };
  } catch {
    return { ok: false, error: "Нет соединения с сервером" };
  }
}

export async function fetchLeads(): Promise<{ leads: Lead[]; total: number }> {
  const res = await fetch(LEADS_URL);
  return res.json();
}

export interface Lead {
  id: number;
  email: string;
  source: string;
  url: string;
  created_at: string;
}
