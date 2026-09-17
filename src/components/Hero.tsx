import type { CSSProperties, ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: ReactNode
  subline: string
  /** Background image URL (already processed, see src/lib/assets.ts). */
  image: string
  /** Optional looping background video (home page). */
  video?: string
  /** Radial overlay strength at the light end (Divi: 0.5, contact page 0.26). */
  overlay?: number
  padding?: [string, string]
  titleSize?: string
  sublineSize?: string
  position?: string
  blend?: string
  children?: ReactNode
}

export function Hero({
  eyebrow,
  title,
  subline,
  image,
  video,
  overlay = 0.5,
  padding = ['10vw', '10vw'],
  titleSize = '84px',
  sublineSize = '16px',
  position = 'center',
  blend = 'normal',
  children,
}: Props) {
  const style = {
    '--hero-img': `url(${image})`,
    '--hero-alpha': overlay,
    '--hero-pt': padding[0],
    '--hero-pb': padding[1],
    '--hero-h1': titleSize,
    '--hero-sub': sublineSize,
    '--hero-pos': position,
    '--hero-blend': blend,
  } as CSSProperties

  return (
    <section className="hero" style={style}>
      {video && <video className="hero-video" src={video} autoPlay loop muted playsInline />}
      <div className="row !pt-0">
        <div className="col col-4_4">
          <div className="txt hero-eyebrow">
            <p>{eyebrow}</p>
          </div>
          <div className="txt hero-title">
            <h1>{title}</h1>
          </div>
          <div className="txt hero-sub">
            <p>{subline}</p>
          </div>
        </div>
      </div>
      {children}
    </section>
  )
}
