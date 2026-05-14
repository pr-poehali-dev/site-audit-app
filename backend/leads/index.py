"""
Сохранение email-заявок на Pro-доступ и получение списка заявок для админки.
POST / — сохранить заявку { email, source?, url? }
GET /  — список всех заявок (для админки)
"""
import json
import os
import re
import psycopg2


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def is_valid_email(email: str) -> bool:
    return bool(re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", email.strip()))


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")

    # POST — сохранить заявку
    if method == "POST":
        try:
            body = json.loads(event.get("body") or "{}")
        except Exception:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Invalid JSON"})}

        email = (body.get("email") or "").strip().lower()
        if not email or not is_valid_email(email):
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Укажите корректный email"})}

        source = (body.get("source") or "pricing")[:50]
        url = (body.get("url") or "")[:500]

        conn = get_conn()
        try:
            with conn.cursor() as cur:
                # Upsert: если email уже есть — обновляем source/url и время
                cur.execute(
                    """
                    INSERT INTO t_p47511284_site_audit_app.leads (email, source, url)
                    VALUES (%s, %s, %s)
                    ON CONFLICT DO NOTHING
                    RETURNING id
                    """,
                    (email, source, url),
                )
                row = cur.fetchone()
                conn.commit()
                is_new = row is not None
        finally:
            conn.close()

        return {
            "statusCode": 200,
            "headers": cors,
            "body": json.dumps({"ok": True, "new": is_new}),
        }

    # GET — список заявок для админки
    if method == "GET":
        conn = get_conn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, email, source, url, created_at
                    FROM t_p47511284_site_audit_app.leads
                    ORDER BY created_at DESC
                    LIMIT 500
                    """
                )
                rows = cur.fetchall()
        finally:
            conn.close()

        leads = [
            {
                "id": r[0],
                "email": r[1],
                "source": r[2],
                "url": r[3],
                "created_at": r[4].isoformat() if r[4] else None,
            }
            for r in rows
        ]
        return {
            "statusCode": 200,
            "headers": cors,
            "body": json.dumps({"leads": leads, "total": len(leads)}),
        }

    return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}
