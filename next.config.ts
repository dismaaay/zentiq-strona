import type { NextConfig } from "next";

// Nagłówki bezpieczeństwa dla wszystkich tras. CSP celowo dopuszcza 'unsafe-inline'
// dla script-src — App Router wstrzykuje inline'owe skrypty hydratacji/streamingu RSC,
// więc bez tego (albo bez nonce z middleware) strona przestałaby się hydratować.
// Strona nie ma skryptów third-party ani treści od użytkownika, więc powierzchnia XSS
// jest minimalna, a CSP i tak blokuje wstrzyknięcie zewnętrznych skryptów/ramek.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
