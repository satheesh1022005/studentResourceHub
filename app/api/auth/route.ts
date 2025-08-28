import { NextResponse } from 'next/server'
import { authConfig, hashPassword } from '@/data/authConfig'

export async function POST(request: Request) {
  const { action, password, newPassword } = await request.json()

  try {
    const storedHash = authConfig.adminPasswordHash

    if (action === 'login') {
      const inputHash = hashPassword(password)
      return NextResponse.json({ success: inputHash === storedHash })
    }

    if (action === 'changePassword') {
      const currentHash = hashPassword(password)
      if (currentHash === storedHash) {
        // Note: In this implementation, password changes will only persist until server restart
        // You would need a database or environment variable to make it permanent
        authConfig.adminPasswordHash = hashPassword(newPassword)
        return NextResponse.json({ success: true })
      }
      return NextResponse.json({ success: false })
    }

    return NextResponse.json({ success: false, error: 'Invalid action' })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' })
  }
}