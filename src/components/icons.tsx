type IconProps = { size?: number; className?: string }

export function FacebookIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.5 22v-8.2h2.8l.4-3.3h-3.2V8.4c0-.9.3-1.6 1.6-1.6h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.3h2.8V22h3.4z" />
    </svg>
  )
}

export function InstagramIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3.4c2.8 0 3.1 0 4.2.1 2.8.1 4.2 1.5 4.3 4.3.1 1.1.1 1.4.1 4.2s0 3.1-.1 4.2c-.1 2.8-1.5 4.2-4.3 4.3-1.1.1-1.4.1-4.2.1s-3.1 0-4.2-.1c-2.9-.1-4.2-1.5-4.3-4.3-.1-1.1-.1-1.4-.1-4.2s0-3.1.1-4.2C3.6 5 5 3.6 7.8 3.5c1.1-.1 1.4-.1 4.2-.1zM12 1.5c-2.9 0-3.2 0-4.3.1C3.9 1.8 1.8 3.9 1.6 7.7c-.1 1.1-.1 1.4-.1 4.3s0 3.2.1 4.3c.2 3.8 2.3 5.9 6.1 6.1 1.1.1 1.4.1 4.3.1s3.2 0 4.3-.1c3.8-.2 5.9-2.3 6.1-6.1.1-1.1.1-1.4.1-4.3s0-3.2-.1-4.3c-.2-3.8-2.3-5.9-6.1-6.1-1.1-.1-1.4-.1-4.3-.1zm0 5.1a5.4 5.4 0 1 0 0 10.8 5.4 5.4 0 0 0 0-10.8zm0 8.9a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm5.6-10.4a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z" />
    </svg>
  )
}

export function MenuBarsIcon({ size = 32, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 7h24v3H4zM4 14.5h24v3H4zM4 22h24v3H4z" />
    </svg>
  )
}
