interface AuthConfig {
  adminPasswordHash: string
}

// This is the hash of "admin123" using the same hash function
export const authConfig: AuthConfig = {
  adminPasswordHash: "696d29e0940a4957748fe3fc9efd22a3"
}

export function hashPassword(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return hash.toString()
}