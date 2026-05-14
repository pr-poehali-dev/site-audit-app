CREATE TABLE t_p47511284_site_audit_app.leads (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'pricing',
  url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX leads_email_idx ON t_p47511284_site_audit_app.leads (email);
CREATE INDEX leads_created_at_idx ON t_p47511284_site_audit_app.leads (created_at DESC);
