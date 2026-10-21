# Project rules
- Keep sitewide social-preview fallback tags in index.html and route-specific metadata in the existing SEO component because social crawlers may not execute JavaScript.
- Send contact notifications from the form's server function through the managed email helper, preserving saved submissions and audit records independently of sending outcomes.
- Keep legacy email data tables as notification-only history; signed email events update them without deciding whether recipients may receive email.