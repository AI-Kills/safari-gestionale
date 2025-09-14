export type ApiResponse<T = any> = {
  success: boolean
  data?: T
  error?: string
  errors?: Array<{
    code: string
    message: string
    path?: string[]
  }> | Record<string, string[]>
}

export type DBResult<T = any> = {
  success: boolean
  values?: T
  errors?: Record<string, string>
  errorsMessage?: string
}

export type State<T = any> = {
  errors?: T
  message?: string
}
