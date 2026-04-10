"""
Multi-provider email sender.

Supports SendGrid, Postmark, AWS SES, and SMTP. Provider is selected
by environment variable. Defaults to dry-run (writes to a local file)
unless --send is explicitly passed.

Environment variables (set one provider's keys):
  SENDGRID_API_KEY      — SendGrid API key
  POSTMARK_SERVER_TOKEN — Postmark server token
  AWS_ACCESS_KEY_ID     — AWS credentials (uses boto3)
  AWS_SECRET_ACCESS_KEY
  AWS_REGION
  SMTP_HOST             — SMTP server hostname
  SMTP_PORT             — SMTP server port (default 587)
  SMTP_USERNAME         — SMTP username
  SMTP_PASSWORD         — SMTP password

Common:
  GRADEUM_FROM_EMAIL    — sender address (default: outreach@gradeum.io)
  GRADEUM_FROM_NAME     — sender display name (default: Gradeum)
  GRADEUM_REPLY_TO      — reply-to address (optional)
"""

from __future__ import annotations

import logging
import os
import smtplib
from dataclasses import dataclass
from email.message import EmailMessage

logger = logging.getLogger(__name__)


@dataclass
class SendResult:
    success: bool
    provider: str
    message_id: str = ""
    error: str = ""


def get_from_address() -> tuple[str, str]:
    """Return (from_email, from_name) from environment."""
    email = os.environ.get("GRADEUM_FROM_EMAIL", "outreach@gradeum.io")
    name = os.environ.get("GRADEUM_FROM_NAME", "Gradeum")
    return email, name


def detect_provider() -> str:
    """Detect which email provider is configured from env vars."""
    if os.environ.get("SENDGRID_API_KEY"):
        return "sendgrid"
    if os.environ.get("POSTMARK_SERVER_TOKEN"):
        return "postmark"
    if os.environ.get("AWS_ACCESS_KEY_ID") and os.environ.get("AWS_REGION"):
        return "ses"
    if os.environ.get("SMTP_HOST"):
        return "smtp"
    return "none"


# ── Provider implementations ─────────────────────────────────────────────────

def _send_sendgrid(to: str, subject: str, body: str) -> SendResult:
    import requests

    api_key = os.environ["SENDGRID_API_KEY"]
    from_email, from_name = get_from_address()
    reply_to = os.environ.get("GRADEUM_REPLY_TO", "")

    payload = {
        "personalizations": [{"to": [{"email": to}]}],
        "from": {"email": from_email, "name": from_name},
        "subject": subject,
        "content": [{"type": "text/plain", "value": body}],
    }
    if reply_to:
        payload["reply_to"] = {"email": reply_to}

    try:
        resp = requests.post(
            "https://api.sendgrid.com/v3/mail/send",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            json=payload,
            timeout=20,
        )
        if resp.status_code in (200, 202):
            return SendResult(
                success=True,
                provider="sendgrid",
                message_id=resp.headers.get("X-Message-Id", ""),
            )
        return SendResult(
            success=False,
            provider="sendgrid",
            error=f"HTTP {resp.status_code}: {resp.text[:200]}",
        )
    except Exception as exc:  # noqa: BLE001
        return SendResult(success=False, provider="sendgrid", error=str(exc))


def _send_postmark(to: str, subject: str, body: str) -> SendResult:
    import requests

    token = os.environ["POSTMARK_SERVER_TOKEN"]
    from_email, from_name = get_from_address()
    reply_to = os.environ.get("GRADEUM_REPLY_TO", "")

    payload = {
        "From": f"{from_name} <{from_email}>",
        "To": to,
        "Subject": subject,
        "TextBody": body,
        "MessageStream": "outbound",
    }
    if reply_to:
        payload["ReplyTo"] = reply_to

    try:
        resp = requests.post(
            "https://api.postmarkapp.com/email",
            headers={
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-Postmark-Server-Token": token,
            },
            json=payload,
            timeout=20,
        )
        data = resp.json()
        if resp.status_code == 200 and data.get("ErrorCode") == 0:
            return SendResult(
                success=True,
                provider="postmark",
                message_id=data.get("MessageID", ""),
            )
        return SendResult(
            success=False,
            provider="postmark",
            error=f"{data.get('ErrorCode')}: {data.get('Message', '')}",
        )
    except Exception as exc:  # noqa: BLE001
        return SendResult(success=False, provider="postmark", error=str(exc))


def _send_ses(to: str, subject: str, body: str) -> SendResult:
    try:
        import boto3
    except ImportError:
        return SendResult(
            success=False, provider="ses",
            error="boto3 not installed. Run: pip install boto3",
        )

    from_email, from_name = get_from_address()
    reply_to = os.environ.get("GRADEUM_REPLY_TO", "")

    try:
        client = boto3.client("ses", region_name=os.environ.get("AWS_REGION", "us-east-1"))
        kwargs = {
            "Source": f"{from_name} <{from_email}>",
            "Destination": {"ToAddresses": [to]},
            "Message": {
                "Subject": {"Data": subject, "Charset": "UTF-8"},
                "Body": {"Text": {"Data": body, "Charset": "UTF-8"}},
            },
        }
        if reply_to:
            kwargs["ReplyToAddresses"] = [reply_to]

        resp = client.send_email(**kwargs)
        return SendResult(
            success=True,
            provider="ses",
            message_id=resp.get("MessageId", ""),
        )
    except Exception as exc:  # noqa: BLE001
        return SendResult(success=False, provider="ses", error=str(exc))


def _send_smtp(to: str, subject: str, body: str) -> SendResult:
    from_email, from_name = get_from_address()
    reply_to = os.environ.get("GRADEUM_REPLY_TO", "")

    host = os.environ["SMTP_HOST"]
    port = int(os.environ.get("SMTP_PORT", "587"))
    username = os.environ.get("SMTP_USERNAME", "")
    password = os.environ.get("SMTP_PASSWORD", "")

    msg = EmailMessage()
    msg["From"] = f"{from_name} <{from_email}>"
    msg["To"] = to
    msg["Subject"] = subject
    if reply_to:
        msg["Reply-To"] = reply_to
    msg.set_content(body)

    try:
        with smtplib.SMTP(host, port, timeout=20) as smtp:
            smtp.starttls()
            if username and password:
                smtp.login(username, password)
            smtp.send_message(msg)
        return SendResult(success=True, provider="smtp")
    except Exception as exc:  # noqa: BLE001
        return SendResult(success=False, provider="smtp", error=str(exc))


# ── Public API ───────────────────────────────────────────────────────────────

def send_email(to: str, subject: str, body: str) -> SendResult:
    """Send a single email via the configured provider.

    Raises RuntimeError if no provider is configured.
    """
    provider = detect_provider()
    if provider == "sendgrid":
        return _send_sendgrid(to, subject, body)
    if provider == "postmark":
        return _send_postmark(to, subject, body)
    if provider == "ses":
        return _send_ses(to, subject, body)
    if provider == "smtp":
        return _send_smtp(to, subject, body)

    raise RuntimeError(
        "No email provider configured. Set one of: SENDGRID_API_KEY, "
        "POSTMARK_SERVER_TOKEN, AWS_ACCESS_KEY_ID, or SMTP_HOST.",
    )
