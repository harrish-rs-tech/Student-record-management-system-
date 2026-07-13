type LogoProps = {
  size?: number
  showText?: boolean
  className?: string
}

export default function Logo({ size = 40, showText = true, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="relative flex items-center justify-center rounded-xl"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F5D27A" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#A8842B" />
            </linearGradient>
            <linearGradient id="logoDark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#logoDark)" />
          <path
            d="M32 10 L52 20 L52 36 C52 46 42 54 32 56 C22 54 12 46 12 36 L12 20 Z"
            fill="url(#logoGold)"
          />
          <text
            x="32"
            y="38"
            textAnchor="middle"
            fontFamily="Georgia, serif"
            fontSize="20"
            fontWeight="700"
            fill="#0a0a0a"
          >
            HRS
          </text>
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-bold tracking-wide" style={{ color: 'var(--text)' }}>
            HRS Institute
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ color: 'var(--gold-dark)' }}>
            Excellence in Education
          </span>
        </div>
      )}
    </div>
  )
}