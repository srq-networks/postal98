import { Picture } from './Picture'

const caps = 'relative text-shadow-lg/50 uppercase tracking-hero'

export function Hero({ eyebrow, title, mustache, image, video, children, tall }) {
  return (
    <section
      className={`relative flex items-center overflow-hidden ${tall ? 'py-splash' : 'py-hero'} text-center text-paper`}
    >
      <Picture
        picture={image}
        alt=""
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover"
      />
      {video && (
        <video
          src={video}
          poster={image.img.src}
          className="absolute inset-0 size-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      <div className="absolute inset-0 isolate bg-radial from-ink/0 to-ink/85 mix-blend-darken" />
      <div className="row py-16 *:text-shadow-lg/50">
        <p className={`${caps} z-10 -mb-11 font-black text-2xl max-md:text-sm`}>{eyebrow}</p>
        <h1 className="border-white/60 border-y py-16 font-lobster text-8xl text-paper tracking-wide max-md:text-4xl">
          {title}
        </h1>
        <p className={`${caps} -mt-11 font-bold text-lg max-md:text-xs`}>{mustache}</p>
        {children}
      </div>
    </section>
  )
}
