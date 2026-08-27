const isStatic = process.env.TARGET === 'static'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStatic ? 'export' : undefined,
  trailingSlash: true,
  images: isStatic
    ? { unoptimized: true }
    : { formats: ['image/avif', 'image/webp'] },
}

export default nextConfig
