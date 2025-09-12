/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.iwsafari.com',
        port: '',
        pathname: '/sites/default/files/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: 'default',
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Webpack configuration for auto-imports
  webpack: (config, { isServer, webpack }) => {
    // Auto-import React hooks and utilities
    config.plugins.push(
      new webpack.ProvidePlugin({
        // React hooks
        useState: ['react', 'useState'],
        useEffect: ['react', 'useEffect'],
        useCallback: ['react', 'useCallback'],
        useMemo: ['react', 'useMemo'],
        useRef: ['react', 'useRef'],
        useContext: ['react', 'useContext'],
        useReducer: ['react', 'useReducer'],
        useLayoutEffect: ['react', 'useLayoutEffect'],
        useImperativeHandle: ['react', 'useImperativeHandle'],
        useDeferredValue: ['react', 'useDeferredValue'],
        useTransition: ['react', 'useTransition'],
        useId: ['react', 'useId'],
        
        // React utilities
        Fragment: ['react', 'Fragment'],
        Suspense: ['react', 'Suspense'],
        StrictMode: ['react', 'StrictMode'],
        forwardRef: ['react', 'forwardRef'],
        memo: ['react', 'memo'],
        lazy: ['react', 'lazy'],
        createContext: ['react', 'createContext'],
        
        // Next.js router (client-side only)
        ...(isServer ? {} : {
          useRouter: ['next/navigation', 'useRouter'],
          usePathname: ['next/navigation', 'usePathname'],
          useSearchParams: ['next/navigation', 'useSearchParams'],
          useParams: ['next/navigation', 'useParams'],
        }),
        
        // Next.js components
        Link: ['next/link', 'default'],
        Image: ['next/image', 'default'],
        Script: ['next/script', 'default'],
        
        // Next.js utilities
        notFound: ['next/navigation', 'notFound'],
        redirect: ['next/navigation', 'redirect'],
        permanentRedirect: ['next/navigation', 'permanentRedirect'],
        revalidatePath: ['next/cache', 'revalidatePath'],
        revalidateTag: ['next/cache', 'revalidateTag'],
        
        // Common utilities
        clsx: ['clsx', 'default'],
        cn: ['@/lib/utils', 'cn'],
      })
    );

    return config;
  },
  
  // Experimental features
  experimental: {
    optimizePackageImports: ['react', 'next', 'clsx'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // TypeScript configuration
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  
  // Environment variables auto-completion
  env: {
    CUSTOM_KEY: 'my-value',
  },
};

export default nextConfig;
