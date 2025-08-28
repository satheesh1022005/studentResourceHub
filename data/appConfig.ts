export interface AppConfig {
  adminPasswordHash: string
}

// Simple hash function for frontend-only password storage
export function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString()
}

// Store the pre-computed hash of "admin123" instead of computing it each time
// This value is the result of simpleHash("admin123")
const DEFAULT_HASH = "-969161597"

let appConfig: AppConfig = {
  adminPasswordHash: DEFAULT_HASH,
}

export const getAppConfig = (): AppConfig => {
  return appConfig
}

export const updateAppConfig = (config: AppConfig): void => {
  appConfig = { ...config }
}

export const hashPassword = (password: string): string => {
  return simpleHash(password)
}
