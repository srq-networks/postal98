import { type CSSProperties, type ReactNode, useEffect, useState } from 'react'
import { Picture } from './Picture'

type Props = {
  eyebrow: string
  title: ReactNode
  subline: string
  /** Background image upload path (rendered through the "bg" variants). */
  image: string
  /** Optional looping background video URL (home page). */
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

/** Resolves to the video URL only once the page has finished loading, so the
 *  2.7MB hero clip never competes with the poster, fonts and scripts. */
function useDeferredVideo(src?: string) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (document.readyState === 'complete') {
      setReady(true)
      return
    }
    const onLoad = () => setReady(true)
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])
  return ready ? src : undefined
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
  const videoSrc = useDeferredVideo(video)
  const style = {
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
      <Picture
        kind="bg"
        src={image}
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="bg-layer"
      />
      {video && (
        <video
          className="hero-video"
          src={videoSrc}
          preload="none"
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      <div className="hero-overlay" />
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
