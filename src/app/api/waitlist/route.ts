import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json()

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid email.' },
        { status: 400 }
      )
    }

    // Rate limit by IP hash
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const ipHash = createHash('sha256').update(ip).digest('hex')

    const oneHourAgo = new Date(Date.now() - 3600000).toISOString()
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', oneHourAgo)

    if (count && count >= 5) {
      return NextResponse.json(
        { status: 'error', message: 'Too many requests. Try again later.' },
        { status: 429 }
      )
    }

    // Insert (upsert on email to handle duplicates gracefully)
    const { error } = await supabase
      .from('waitlist')
      .upsert(
        { email: email.toLowerCase(), source: source || 'portal', ip_hash: ipHash },
        { onConflict: 'email' }
      )

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { status: 'error', message: 'Something went wrong.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ status: 'ok', message: 'You are on the list.' })
  } catch (e) {
    console.error('API error:', e)
    return NextResponse.json(
      { status: 'error', message: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
