"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { getAppConfig, updateAppConfig, hashPassword } from "@/data/appConfig"

interface AuthContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
  changePassword: (currentPassword: string, newPassword: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (password: string): boolean => {
    const config = getAppConfig()
    const inputHash = hashPassword(password)

    if (inputHash === config.adminPasswordHash) {
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const changePassword = (currentPassword: string, newPassword: string): boolean => {
    const config = getAppConfig()
    const currentHash = hashPassword(currentPassword)

    if (currentHash === config.adminPasswordHash) {
      const newHash = hashPassword(newPassword)
      updateAppConfig({
        ...config,
        adminPasswordHash: newHash
      })
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
