import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru'], 
    defaultLocale: 'en', 
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true, 
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    override: {
                      removeViewBox: false, 
                    },
                  },
                },
              ],
            },
            titleProp: true,
            ref: true, 
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
