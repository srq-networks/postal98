const caps = 'relative text-shadow-lg/50 uppercase tracking-hero'

export function Hero({ eyebrow, title, mustache, image, video, children }) {
  return (
    <section className="relative flex min-h-hero items-center overflow-hidden text-center text-paper">
      <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
      {video && (
        <video
          src={video}
          className="absolute inset-0 size-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      )}

      <div className="row py-16 *:text-shadow-lg/50">
        <p className={`${caps} z-10 -mb-11 font-black text-2xl max-md:text-sm`}>{eyebrow}</p>
        <h1 className="border-white/60 border-y py-16 font-lobster text-8xl text-paper tracking-wide max-md:text-4xl">
          {title}
        </h1>
        <p className={`${caps} -mt-11 font-bold max-md:text-xs`}>{mustache}</p>
        {children}
      </div>
    </section>
  )
}
