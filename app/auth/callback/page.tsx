'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        router.push('/music')
      } else {
        router.push('/login')
      }
    }

    handleAuth()
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <p>Anmeldung wird abgeschlossen…</p>
    </div>
  )
}
