declare global {
  // Next.js Navigation hooks
  const useRouter: typeof import('next/navigation').useRouter
  const usePathname: typeof import('next/navigation').usePathname
  const useSearchParams: typeof import('next/navigation').useSearchParams
  const useParams: typeof import('next/navigation').useParams
  
  // Next.js Components
  const Link: typeof import('next/link').default
  const Image: typeof import('next/image').default
  const Script: typeof import('next/script').default
  
  // Next.js Types
  type NextPage<P = {}, IP = P> = import('next').NextPage<P, IP>
  type GetServerSideProps<P = {}, Q = {}> = import('next').GetServerSideProps<P, Q>
  type GetStaticProps<P = {}, Q = {}> = import('next').GetStaticProps<P, Q>
  type GetStaticPaths = import('next').GetStaticPaths
  type AppProps = import('next/app').AppProps
  type NextApiRequest = import('next').NextApiRequest
  type NextApiResponse = import('next').NextApiResponse
  
  // Next.js App Router types
  type PageProps = {
    params: Record<string, string>
    searchParams: Record<string, string | string[]>
  }
  
  type LayoutProps = {
    children: ReactNode
    params: Record<string, string>
  }
  
  // Next.js utilities
  const notFound: typeof import('next/navigation').notFound
  const redirect: typeof import('next/navigation').redirect
  const permanentRedirect: typeof import('next/navigation').permanentRedirect
  const revalidatePath: typeof import('next/cache').revalidatePath
  const revalidateTag: typeof import('next/cache').revalidateTag
  
  // Next.js fonts
  const Inter: typeof import('next/font/google').Inter
  const Roboto: typeof import('next/font/google').Roboto
} 