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
  blend?: Blend
  children?: ReactNode
}

type Blend = 'normal' | 'lighten' | 'darken'
const blends: Record<Blend, string> = {
  normal: 'mix-blend-normal',
  lighten: 'mix-blend-lighten',
  darken: 'mix-blend-darken',
}
const caps = 'font-cairo leading-[1.5em] text-center text-paper uppercase'
const capsShadow = 'text-shadow-[0.36em_-0.08em_0.84em_#000]'

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
  } as CSSProperties

  return (
    <section
      className="relative overflow-hidden pt-(--hero-pt) pb-(--hero-pb) max-lg:py-25 max-md:py-15"
      style={style}
    >
      <Picture
        kind="bg"
        src={image}
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="bg-layer object-(--hero-pos)"
      />
      {video && (
        <video className="bg-layer" src={videoSrc} preload="none" autoPlay loop muted playsInline />
      )}
      <div
        className={`absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,0,0,var(--hero-alpha))_30%,#000_100%)] ${blends[blend]}`}
      />
      <div className="row z-1 pb-6.75 max-lg:pb-7.5">
        <div
          className={`relative z-1 mx-auto -mb-[2.4em] max-w-150 text-2xl font-black tracking-[18px] max-lg:text-xl max-md:text-sm ${caps} ${capsShadow}`}
        >
          <p>{eyebrow}</p>
        </div>
        <div className="relative z-0 border-y-2 border-white/18 pt-[3vw] pb-[2.5vw] text-shadow-[0_0_0.3em_rgba(0,0,0,0.4)] max-lg:pt-5 max-lg:pb-2.5">
          <h1 className="text-center font-lobster text-(length:--hero-h1) leading-[1.5em] tracking-[3px] text-paper text-shadow-[0_0.3em_1em_#000] max-lg:text-[45px] max-md:text-[35px]">
            {title}
          </h1>
        </div>
        <div
          className={`relative z-1 mx-auto -mt-[2.4em] max-w-150 -translate-x-3.25 pl-7.5 text-(length:--hero-sub) font-bold tracking-[16px] max-lg:text-sm max-md:text-xs ${caps} ${capsShadow}`}
        >
          <p>{subline}</p>
        </div>
      </div>
      {children}
    </section>
  )
}
