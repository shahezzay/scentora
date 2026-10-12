// Original SVG illustration used in place of product photos.

export default function Bottle({ colors = ["#222", "#b8893b"], kind = "perfume", className = "" }) {
  const [liquid, accent] = colors;
  const id = `g-${liquid.replace("#", "")}-${accent.replace("#", "")}-${kind}`;

  if (kind === "candle") {
    return (
      <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Scented candle">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={liquid} stopOpacity="0.85" />
            <stop offset="0.5" stopColor={accent} stopOpacity="0.55" />
            <stop offset="1" stopColor={liquid} stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="176" rx="58" ry="8" fill="#000" opacity="0.12" />
        <rect x="50" y="86" width="100" height="88" rx="10" fill={`url(#${id})`} />
        <rect x="50" y="86" width="100" height="10" rx="5" fill="#fff" opacity="0.25" />
        <rect x="68" y="116" width="64" height="30" rx="3" fill="#fff" opacity="0.85" />
        <rect x="78" y="126" width="44" height="3" fill="#111" opacity="0.7" />
        <rect x="86" y="134" width="28" height="3" fill="#111" opacity="0.4" />
        <line x1="100" y1="86" x2="100" y2="70" stroke="#222" strokeWidth="2" />
        <path d="M100 52 C 90 62 92 72 100 72 C 108 72 110 62 100 52Z" fill="#f4b942" />
        <path d="M100 60 C 96 66 97 71 100 71 C 103 71 104 66 100 60Z" fill="#fff3c4" />
      </svg>
    );
  }

  if (kind === "bundle") {
    return (
      <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Gift set">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={liquid} />
            <stop offset="1" stopColor={accent} />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="178" rx="70" ry="8" fill="#000" opacity="0.12" />
        <rect x="30" y="92" width="140" height="82" rx="6" fill={`url(#${id})`} />
        <rect x="24" y="76" width="152" height="24" rx="5" fill={accent} />
        <rect x="94" y="76" width="12" height="98" fill="#fff" opacity="0.7" />
        <path d="M100 76 C 78 46 54 62 78 76 Z" fill="#fff" opacity="0.85" />
        <path d="M100 76 C 122 46 146 62 122 76 Z" fill="#fff" opacity="0.85" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Perfume bottle">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={liquid} stopOpacity="0.9" />
          <stop offset="0.45" stopColor={accent} stopOpacity="0.75" />
          <stop offset="1" stopColor={liquid} />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="178" rx="48" ry="7" fill="#000" opacity="0.12" />
      <rect x="84" y="20" width="32" height="26" rx="4" fill="#1a1a1a" />
      <rect x="84" y="20" width="32" height="5" rx="2" fill="#fff" opacity="0.2" />
      <rect x="92" y="44" width="16" height="14" fill="#c9c9c9" />
      <rect x="52" y="58" width="96" height="116" rx="14" fill="#fff" opacity="0.55" stroke="#d9d9d9" />
      <rect x="58" y="86" width="84" height="82" rx="9" fill={`url(#${id})`} />
      <rect x="72" y="112" width="56" height="34" rx="2" fill="#fff" opacity="0.88" />
      <rect x="80" y="121" width="40" height="3" fill="#111" opacity="0.75" />
      <rect x="86" y="129" width="28" height="3" fill="#111" opacity="0.45" />
      <rect x="90" y="136" width="20" height="2" fill="#111" opacity="0.3" />
      <rect x="62" y="64" width="9" height="100" rx="4" fill="#fff" opacity="0.45" />
    </svg>
  );
}
