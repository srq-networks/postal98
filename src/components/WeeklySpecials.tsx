import { site, uploads } from '../data/site'
import { rawUrl } from '../lib/assets'
import { Button } from './Button'
import { Stripe } from './Stripe'

type Props = { variant: 'home' | 'menu' }

/** "Weekly Specials" block shared by Home and Menu (section spacing differs per page). */
export function WeeklySpecials({ variant }: Props) {
  const sectionStyle =
    variant === 'menu'
      ? {
          backgroundImage: `url(${rawUrl(uploads.cornerPattern)})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0px bottom 0px',
        }
      : undefined

  return (
    <section
      className={`section bg-white ${variant === 'menu' ? '!pt-[10px] !pb-[129px]' : '!pt-[38px] !pb-[73px]'}`}
      style={sectionStyle}
    >
      <Stripe
        title="Weekly Specials"
        className={variant === 'menu' ? '!py-[30px] !mt-[3px]' : '!py-[10px] !mt-[5px]'}
      />
      <div className="row !pt-0 !pb-[27px]">
        <div className="col col-4_4">
          <div className="txt mod mx-auto max-w-[600px] text-center font-cairo font-semibold text-[18px] leading-[1.8em]">
            <h2 className="font-vast uppercase text-[50px] leading-[1.4em] max-lg:text-[35px] max-md:text-[25px]" />
            <p>Please visit our social media pages to view our weekly specials!</p>
          </div>
        </div>
      </div>
      <div className="row row-4col !pt-0 !pb-[27px]">
        <div className="col col-1_4 col-empty" />
        <div className="col col-1_4 text-center">
          <div className="mod !mt-[40px]">
            <Button href={site.links.facebook} external>
              Facebook
            </Button>
          </div>
        </div>
        <div className="col col-1_4 text-center">
          <div className="mod !mt-[40px]">
            <Button href={site.links.instagram} external>
              Instagram
            </Button>
          </div>
        </div>
        <div className="col col-1_4 col-empty" />
      </div>
    </section>
  )
}
