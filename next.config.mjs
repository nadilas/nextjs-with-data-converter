import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const dcPath = require.resolve('./temporal/lib/data-converter.js')

// next.config.js
export default {
  // Prefer loading of ES Modules over CommonJS
  experimental: { esmExternals: 'loose' },
  webpack: (config) => {
    return {
      ...config,
      externals: [
        ...config.externals,
        {
          '$dc': `var "${dcPath}"`
        },
      ],
    }
  },
}