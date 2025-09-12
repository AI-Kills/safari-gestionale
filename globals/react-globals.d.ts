import 'react'

declare global {
  // React hooks auto-import
  const useState: typeof import('react').useState
  const useEffect: typeof import('react').useEffect
  const useCallback: typeof import('react').useCallback
  const useMemo: typeof import('react').useMemo
  const useRef: typeof import('react').useRef
  const useContext: typeof import('react').useContext
  const useReducer: typeof import('react').useReducer
  const useLayoutEffect: typeof import('react').useLayoutEffect
  const useImperativeHandle: typeof import('react').useImperativeHandle
  const useDeferredValue: typeof import('react').useDeferredValue
  const useTransition: typeof import('react').useTransition
  const useId: typeof import('react').useId
  
  // React types auto-import
  type FC<P = {}> = import('react').FC<P>
  type ReactNode = import('react').ReactNode
  type ReactElement = import('react').ReactElement
  type ComponentProps<T> = import('react').ComponentProps<T>
  type PropsWithChildren<P = {}> = import('react').PropsWithChildren<P>
  type CSSProperties = import('react').CSSProperties
  type MouseEvent<T = Element> = import('react').MouseEvent<T>
  type ChangeEvent<T = Element> = import('react').ChangeEvent<T>
  type FormEvent<T = Element> = import('react').FormEvent<T>
  type KeyboardEvent<T = Element> = import('react').KeyboardEvent<T>
  type FocusEvent<T = Element> = import('react').FocusEvent<T>
  
  // React components auto-import
  const Fragment: typeof import('react').Fragment
  const Suspense: typeof import('react').Suspense
  const StrictMode: typeof import('react').StrictMode
  
  // React utilities
  const forwardRef: typeof import('react').forwardRef
  const memo: typeof import('react').memo
  const lazy: typeof import('react').lazy
  const createContext: typeof import('react').createContext
} 