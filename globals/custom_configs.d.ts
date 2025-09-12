declare global {
  // App Configuration Types
  type AppConfig = {
    name: string
    version: string
    environment: 'development' | 'production' | 'test'
    baseUrl: string
    apiUrl: string
  }
  
  // Environment Variables
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      NEXTAUTH_SECRET: string
      NEXTAUTH_URL: string
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }
  
  // Travel specific types
  type TipoViaggio = 'business' | 'leisure' | 'group' | 'individual'
  type StatoPreventivo = 'draft' | 'sent' | 'approved' | 'rejected' | 'cancelled'
  type TipoCliente = 'individual' | 'corporate' | 'agency'
  type Provenienza = 'website' | 'phone' | 'email' | 'referral' | 'walk-in'
  type Valuta = 'EUR' | 'USD' | 'GBP' | 'CHF' | 'JPY'
  type Sesso = 'M' | 'F'
  
  // Business logic constants
  type BusinessConstants = {
    MAX_ADULTI: number
    MAX_BAMBINI: number
    DEFAULT_RICARICO_PERCENTUALE: number
    VALUTE_SUPPORTATE: Valuta[]
    STATI_PREVENTIVO: StatoPreventivo[]
    TIPI_VIAGGIO: TipoViaggio[]
  }
  
  // Form field configurations
  type FormFieldConfig = {
    name: string
    label: string
    type: 'text' | 'email' | 'tel' | 'date' | 'number' | 'select' | 'textarea'
    required?: boolean
    placeholder?: string
    options?: Array<{ value: string; label: string }>
    validation?: {
      min?: number
      max?: number
      pattern?: string
      message?: string
    }
  }
  
  // Table column configuration
  type TableColumn<T = any> = {
    key: keyof T
    header: string
    sortable?: boolean
    width?: string
    render?: (value: any, row: T) => ReactNode
  }
  
  // Navigation configuration
  type NavItem = {
    name: string
    href: string
    icon?: string
    children?: NavItem[]
    permission?: string
  }
  
  // Dashboard configuration
  type DashboardCard = {
    title: string
    value: string | number
    description?: string
    trend?: {
      value: number
      direction: 'up' | 'down'
      period: string
    }
    icon?: string
    color?: string
  }
  
  // Settings configuration
  type AppSettings = {
    appearance: {
      theme: 'light' | 'dark' | 'system'
      language: 'it' | 'en'
    }
    notifications: {
      email: boolean
      push: boolean
      browser: boolean
    }
    business: {
      defaultCurrency: Valuta
      defaultRicarico: number
      workingHours: {
        start: string
        end: string
      }
      timeZone: string
    }
  }
} 