import { Link } from '@tanstack/react-router'

export default function Welcome() {
  const images = Array.from({ length: 12 }, (_, i) => {
    const width = i % 3 === 0 ? 720 : i % 3 === 1 ? 640 : 560
    const height = i % 3 === 0 ? 520 : i % 3 === 1 ? 460 : 420
    return `https://picsum.photos/${width}/${height}?random=${i}`
  })

  const tiles = [
    'col-span-5 row-span-3',
    'col-span-4 row-span-3',
    'col-span-3 row-span-2',
    'col-span-4 row-span-2',
    'col-span-4 row-span-3',
  ]

  return (
    <section className='relative min-h-screen overflow-hidden'>
      {/* BACKGROUND MOSAIC */}
      <div className='absolute inset-0'>
        <div className='absolute left-1/2 top-1/2 h-[1000px] w-[1200px] sm:h-[1400px] sm:w-[1600px] -translate-x-1/2 -translate-y-1/2 -rotate-12 scale-110'>
          <div className='grid h-full w-full grid-cols-12 grid-rows-6 gap-3 opacity-95 sm:gap-6'>
            {images.map((src, i) => (
              <div
                key={src}
                className={[
                  'relative overflow-hidden rounded-3xl  shadow-[0_30px_80px_-50px_rgba(0,0,0,0.55)] ring-1 ring-black/10',
                  tiles[i] ?? 'col-span-4 row-span-3',
                ].join(' ')}
              >
                <img
                  src={src}
                  alt={`Photo ${i + 1}`}
                  loading='lazy'
                  decoding='async'
                  className='h-full w-full object-cover'
                />
              </div>
            ))}
          </div>
        </div>

        <div className='absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/30' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),rgba(0,0,0,0.35)_60%,rgba(0,0,0,0.55)_100%)]' />
      </div>

      {/* LOGO */}
      <div className='absolute z-30 left-1/2 top-10 -translate-x-1/2'>
        <div className='flex items-center lg:gap-6 gap-10 bg-white/10 backdrop-blur-md lg:px-6 px-4 lg:py-4 py-2 rounded-full shadow-md'>
          {/* Logo / App name */}
          <span className='text-white lg:text-2xl text-lg font-semibold tracking-tight'>
             MyApp
          </span>

          {/* Sélecteur de langue */}
          <div className='relative'>
            <select
              name='language'
              id='language'
              className='appearance-none bg-white/10 text-white pl-8 pr-6 py-1 rounded-full border border-white/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40'
            >
              <option value='fr' className='text-primary'>
                french
              </option>
              <option value='en' className='text-primary'>
                english
              </option>
            </select>

            {/* Flag en arrière-plan */}
            <img
              src='https://flagcdn.com/16x12/us.png'
              alt='US'
              className='absolute left-2 top-1/2 -translate-y-1/2 w-4 h-3 pointer-events-none'
            />
            {/* Flag en arrière-plan */}
            <img
              src='https://flagcdn.com/16x12/fr.png'
              alt='FR'
              className='absolute left-2 top-1/2 -translate-y-1/2 w-4 h-3 pointer-events-none'
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className='relative z-10 flex h-screen  items-center justify-center px-4 sm:px-6'>
        <div className='w-full max-w-lg'>
          <div className='rounded-[28px] bg-white px-6 py-8 sm:px-8 sm:py-10 shadow-2xl shadow-black/20 ring-1 ring-black/5'>
            <h1 className='text-center text-4xl font-semibold leading-[1.05] tracking-tight text-black sm:text-5xl'>
              Your business
              <br />
              with My app
            </h1>
            <p className='mt-4 text-pretty text-base text-black/65 sm:text-lg'>
              Try 3 days free, then <span className='font-medium'>$1</span>
              /month for 3 months.
              <br />
              What are you waiting for?
            </p>
          </div>

          <div className='mt-5 rounded-[28px] bg-black/85 px-5 py-5 sm:px-7 sm:py-6 shadow-2xl shadow-black/30 ring-1 ring-white/10 backdrop-blur'>
            <div className='text-white'>
              <p className='text-lg font-semibold'>Start for free</p>
              <p className='mt-1 text-sm text-white/60'>
                You agree to receive marketing emails.
              </p>
            </div>

            <div className='mt-4 flex flex-col gap-2 sm:flex-row'>
              <Link
                to='/signIn'
                className='flex h-14 flex-1 items-center justify-center rounded-full bg-white px-6 text-base font-medium text-black ring-1 ring-white/20 transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
              >
                Let’s get started
              </Link>
              <Link
                to='/signUp'
                className='flex h-14 flex-1 items-center justify-center rounded-full bg-white/10 px-6 text-base font-medium text-white ring-1 ring-white/20 transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
