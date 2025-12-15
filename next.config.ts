// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Image optimization
  images: {    
    // Define device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Define image sizes for the `sizes` prop
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750],
    
    // Formats to use (WebP is more efficient, AVIF is even better but slower)
    formats: ['image/avif', 'image/webp'],
    
    // If using external images, add domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jamesgabbitus.dev',
      },
      // Add more as needed
    ],
    
    // Disable size limit warning if using large images
    // dangerouslyAllowSVG: true,
    // contentDispositionType: 'attachment',
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      // Cache static assets
      {
        source: "/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache images
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache fonts
      {
        source: "/:all*(woff|woff2|ttf|otf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects (for SEO - avoid duplicate content)
  async redirects() {
    return [
      // Redirect trailing slashes
      {
        source: "/:path+/",
        destination: "/:path+",
        permanent: true,
      },
      // Redirect www to non-www (or vice versa)
      // Uncomment and adjust based on your preference
      // {
      //   source: "/:path*",
      //   has: [{ type: "host", value: "www.jamesgabbitus.com" }],
      //   destination: "https://jamesgabbitus.com/:path*",
      //   permanent: true,
      // },
    ];
  },
};

module.exports = nextConfig;