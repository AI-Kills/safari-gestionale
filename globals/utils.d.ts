declare global {
  // Utility function types
  const cn: typeof import('../lib/utils').cn
  const clsx: typeof import('clsx').default
  
  // Common utility types
  type ClassValue = import('clsx').ClassValue
  
  // Date utilities
  type DateInput = Date | string | number
  
  // API Response types
  type ApiResponse<T = any> = {
    success: boolean
    data?: T
    error?: string
    errors?: Array<{
      code: string
      message: string
      path?: string[]
    }>
  }
  
  // Form validation types
  type ValidationResult<T = any> = {
    success: boolean
    data?: T
    error?: {
      issues: Array<{
        code: string
        message: string
        path?: string[]
      }>
    }
  }
  
  // Common component props
  type BaseComponentProps = {
    className?: string
    children?: ReactNode
  }
  
  // Table/List utilities
  type SortDirection = 'asc' | 'desc'
  type SortConfig<T = any> = {
    key: keyof T
    direction: SortDirection
  }
  
  type PaginationConfig = {
    page: number
    pageSize: number
    total: number
  }
  
  // Form utilities
  type FormStatus = 'idle' | 'loading' | 'success' | 'error'
  
  type FormState<T = any> = {
    status: FormStatus
    data?: T
    error?: string
    errors?: Record<string, string[]>
  }
  
  // Common event handlers
  type ClickHandler = (event: MouseEvent<HTMLElement>) => void
  type ChangeHandler<T = HTMLInputElement> = (event: ChangeEvent<T>) => void
  type SubmitHandler<T = HTMLFormElement> = (event: FormEvent<T>) => void
  
  // Async utilities
  type AsyncState<T = any> = {
    data?: T
    loading: boolean
    error?: string
  }
  
  // ID utilities
  type EntityId = string
  type EntityIds = EntityId[]
} 